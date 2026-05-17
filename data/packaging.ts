export type Packaging = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export const packagingOptions: Packaging[] = [
  { id: "standard", name: "Standard packaging", description: "Đóng gói gọn gàng cho đơn hàng thông thường.", price: 0 },
  { id: "premium", name: "Premium gift box", description: "Hộp quà trang nhã phù hợp biếu tặng gia đình.", price: 90000 },
  { id: "luxury", name: "Luxury gift box", description: "Hộp quà cao cấp với diện mạo sang trọng hơn.", price: 180000 },
  { id: "message-card", name: "Gift message card", description: "Thêm thiệp chúc mừng cá nhân hóa trong đơn hàng.", price: 30000 },
];
