import { packagingOptions } from "@/server/catalog/packaging";
import { products } from "@/server/catalog/products";
import { insertOrder } from "@/server/repositories/orders";
import type { OrderInsert } from "@/server/repositories/orders";
import type { CreateOrderInput } from "@/server/validation/orders";

export class OrderInputError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "OrderInputError";
    }
}

type OrderRepository = (order: OrderInsert) => Promise<{ orderId: string }>;

type PackagingStatus = OrderInsert["packagingStatus"];


export function buildOrderInsert(input: CreateOrderInput): OrderInsert {
    const quantities = new Map<string, { productId: string; packagingId?: string; quantity: number }>();

    for (const item of input.items) {
        const key = `${item.productId}::${item.packagingId ?? "default"}`;
        const current = quantities.get(key);

        quantities.set(key, {
            productId: item.productId,
            packagingId: item.packagingId,
            quantity: (current?.quantity ?? 0) + item.quantity,
        });
    }

    const items = Array.from(quantities.values()).map(({ productId, packagingId, quantity }) => {
        const product = products.find((entry) => entry.id === productId);

        if (!product) {
            throw new OrderInputError("One or more selected products are not available");
        }

        if (product.availability === "out_of_stock") {
            throw new OrderInputError(`${product.name} is currently out of stock`);
        }

        let packagingFeeVnd = 0;
        let packagingName: string | undefined;
        let packagingFamilyName: string | undefined;
        let packagingVariantName: string | undefined;

        if (packagingId) {
            if (!product.supportsPackaging) {
                throw new OrderInputError(`${product.name} does not support packaging selection`);
            }

            const packaging = packagingOptions.find((item) => item.id === packagingId);

            if (!packaging) {
                throw new OrderInputError("Selected packaging is not available");
            }

            packagingFeeVnd = packaging.price;
            packagingFamilyName = packaging.family.name;
            packagingVariantName = packaging.name;
            packagingName = `${packaging.family.name} - ${packaging.name}`;
        }

        return {
            productId: product.id,
            sku: product.sku,
            productName: product.name,
            unit: product.unit,
            unitPriceVnd: product.price,
            quantity,
            packagingId,
            packagingFamilyName,
            packagingVariantName,
            packagingName,
            packagingFeeVnd,
            subtotalVnd: (product.price + packagingFeeVnd) * quantity,
        };
    });

    const subtotalVnd = items.reduce((total, item) => total + item.subtotalVnd, 0);
    const hasPackagingSelection = items.some((item) => Boolean(item.packagingId));
    const hasPackagingEligibleProduct = items.some((item) => {
        const product = products.find((entry) => entry.id === item.productId);
        return product?.supportsPackaging === true;
    });

    let packagingStatus: PackagingStatus = "not_required";

    if (hasPackagingSelection) {
        packagingStatus = "selected";
    } else if (hasPackagingEligibleProduct) {
        packagingStatus = "optional_available";
    }

    return {
        customerName: input.customer.fullName,
        customerPhone: input.customer.phone,
        customerEmail: input.customer.email,
        deliveryAddress: input.customer.deliveryAddress,
        packagingStatus,
        subtotalVnd,
        estimatedTotalVnd: subtotalVnd,
        notes: input.notes || undefined,
        items,
    };
}

export async function createOrder(input: CreateOrderInput, repository?: OrderRepository) {
    const order = buildOrderInsert(input);
    const persistOrder = repository ?? insertOrder;

    const { orderId } = await persistOrder(order);

    return {
        orderId,
        status: "received" as const,
        subtotalVnd: order.subtotalVnd,
        estimatedTotalVnd: order.estimatedTotalVnd,
    };
}
