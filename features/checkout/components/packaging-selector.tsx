"use client";

import Image from "next/image";
import { packagingOptions, type Packaging } from "@/shared/catalog/packaging";

const colorOptions = [
    { name: "Green", value: "Green", swatch: "#2f7d4f" },
    { name: "Blue", value: "Blue", swatch: "#1f5f9f" },
    { name: "Red", value: "Red", swatch: "#a51f24" },
    { name: "Yellow", value: "Yellow", swatch: "#e7bd38" },
] as const;

const packagingTypeLabels: Record<string, string> = {
    cylinder: "Hình trụ",
    hexagon: "Hình lục giác",
    suitcase: "Cái vali",
};

type PackagingSelectorProps = {
    selectedPackagingId: string;
    onSelect: (packagingId: string) => void;
};

export function PackagingSelector({ selectedPackagingId, onSelect }: PackagingSelectorProps) {
    const selectedPackaging = packagingOptions.find((variant) => variant.id === selectedPackagingId) ?? null;
    const selectedColor = selectedPackaging?.primaryColor ?? "Green";
    const packagesForColor = packagingOptions.filter((variant) => variant.primaryColor === selectedColor);

    function selectColor(color: string) {
        const currentFamilyMatch = packagesForColor.find((variant) => variant.familyId === selectedPackaging?.familyId);
        const nextSelection = packagingOptions.find(
            (variant) => variant.primaryColor === color && variant.familyId === currentFamilyMatch?.familyId,
        ) ?? packagingOptions.find((variant) => variant.primaryColor === color);

        if (nextSelection) {
            onSelect(nextSelection.id);
        }
    }

    return (
        <>
            <p className="packagingChoiceLabel">Màu sắc</p>
            <div className="packagingColorGrid" aria-label="Chọn màu hộp quà">
                {colorOptions.map((color) => (
                    <button
                        className={`packagingColorOption ${selectedColor === color.value ? "selected" : ""}`}
                        aria-label={`Chọn màu ${color.name}`}
                        key={color.value}
                        onClick={() => selectColor(color.value)}
                        title={color.name}
                        type="button"
                    >
                        <span className="packagingColorSwatch" style={{ backgroundColor: color.swatch }} />
                    </button>
                ))}
            </div>

            <p className="packagingChoiceLabel">Kiểu dáng</p>
            <div className="packagingTypeGrid" aria-label="Chọn kiểu hộp quà">
                {packagesForColor.map((variant) => (
                    <PackagingVariantCard
                        key={variant.id}
                        isSelected={selectedPackagingId === variant.id}
                        onSelect={onSelect}
                        variant={variant}
                    />
                ))}
            </div>

            {selectedPackaging ? <p className="selectedPackagingText">Đã chọn: {selectedPackaging.name}</p> : null}
        </>
    );
}

type PackagingVariantCardProps = {
    variant: Packaging;
    isSelected: boolean;
    onSelect: (packagingId: string) => void;
};

function PackagingVariantCard({ variant, isSelected, onSelect }: PackagingVariantCardProps) {
    return (
        <button
            className={`packagingTypeOption ${isSelected ? "selected" : ""}`}
            onClick={() => onSelect(variant.id)}
            type="button"
        >
            <div className="packagingTypeImageFrame">
                <Image
                    alt={variant.name}
                    className="packagingImage"
                    height={180}
                    sizes="(max-width: 700px) 33vw, 160px"
                    src={variant.image}
                    width={180}
                />
            </div>
            <div className="packagingMeta">
                <strong>{packagingTypeLabels[variant.familyId] ?? variant.family.name}</strong>
            </div>
        </button>
    );
}
