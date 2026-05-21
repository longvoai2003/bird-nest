export type Product = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge: string;
  category: "bird-nest";
  unit: string;
  availability: "in_stock" | "preorder" | "out_of_stock";
  supportsPackaging?: boolean;
  sourceUrl: string;
  sortOrder: number;
};

export const products: Product[] = [
  {
    id: "yen-dao-cu-lao-cham",
    sku: "YSTS-YDCLC-001",
    slug: "yen-dao-cu-lao-cham",
    name: "Yến đảo Cù Lao Chàm",
    description: "Yến sào thượng hạng từ Cù Lao Chàm, được giới thiệu như dòng sản phẩm quý cho sức khỏe và phù hợp làm quà biếu cao cấp.",
    price: 3200000,
    image: "https://www.yensaotiensa.com/data/news/2056/yen-dao-cu-lao-cham-5.jpg",
    badge: "Thượng hạng",
    category: "bird-nest",
    unit: "100g",
    availability: "in_stock",
    sourceUrl: "https://www.yensaotiensa.com/yen-dao-cu-lao-cham.html",
    sortOrder: 1,
  },
  {
    id: "to-yen-chung-nguyen-chat",
    sku: "YSTS-TYCNC-002",
    slug: "to-yen-chung-nguyen-chat",
    name: "Tổ yến chưng nguyên chất",
    description: "Yến chưng sẵn giữ lại dưỡng chất từ tổ yến, tiện sử dụng hằng ngày cho người cần bổ sung dinh dưỡng nhanh và dễ dùng.",
    price: 450000,
    image: "https://www.yensaotiensa.com/data/news/2055/to-yen-chung-nguyen-chat-5.jpg",
    badge: "Dùng liền",
    category: "bird-nest",
    unit: "set",
    availability: "in_stock",
    supportsPackaging: true,
    sourceUrl: "https://www.yensaotiensa.com/to-yen-chung-nguyen-chat.html",
    sortOrder: 2,
  },
  {
    id: "yen-tho",
    sku: "YSTS-YTHO-003",
    slug: "yen-tho",
    name: "Yến thô",
    description: "Tổ yến nguyên bản ít bị tác động, còn giữ giá trị dinh dưỡng cao và phù hợp khách hàng muốn tự làm sạch, tự chế biến tại nhà.",
    price: 1850000,
    image: "https://www.yensaotiensa.com/data/news/2054/YEN-THO-5.jpg",
    badge: "Nguyên bản",
    category: "bird-nest",
    unit: "100g",
    availability: "in_stock",
    sourceUrl: "https://www.yensaotiensa.com/yen-tho.html",
    sortOrder: 3,
  },
  {
    id: "rut-long-kho-nguyen-to",
    sku: "YSTS-RLKNT-004",
    slug: "rut-long-kho-nguyen-to",
    name: "Rút lông khô nguyên tổ",
    description: "Tổ yến được làm thủ công, giữ nguyên hình dáng ban đầu, loại bỏ phần lớn tạp chất và giữ mùi thơm, sợi dai đặc trưng.",
    price: 2650000,
    image: "https://www.yensaotiensa.com/data/news/2053/rut-long-kho-nguyen-to-7.jpg",
    badge: "Làm sạch",
    category: "bird-nest",
    unit: "100g",
    availability: "in_stock",
    sourceUrl: "https://www.yensaotiensa.com/rut-long-kho-nguyen-to.html",
    sortOrder: 4,
  },
  {
    id: "rut-long-dinh-hinh-a5-xuat-khau",
    sku: "YSTS-RLDHA5-005",
    slug: "rut-long-dinh-hinh-a5-xuat-khau",
    name: "Rút lông định hình A5 xuất khẩu",
    description: "Dòng yến rút lông định hình với sợi dài, khô giòn, tổ giữ hình dáng đẹp và nở tốt sau khi chưng.",
    price: 2950000,
    image: "https://www.yensaotiensa.com/data/news/2052/rut-long-dinh-hinh-a5-xuat-khau-7.jpg",
    badge: "A5 xuất khẩu",
    category: "bird-nest",
    unit: "100g",
    availability: "preorder",
    sourceUrl: "https://www.yensaotiensa.com/rut-long-dinh-hinh-a5-xuat-khau.html",
    sortOrder: 5,
  },
];
