export type NewsArticle = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
  content: string[];
};

export const news: NewsArticle[] = [
  {
    slug: "khao-sat-vung-chim-yen-tai-thi-xa-dien-ban",
    title: "Khảo sát vùng chim yến tại thị xã Điện Bàn",
    summary: "Vào một ngày cuối tháng 6 đầu tháng 7, đội ngũ tư vấn khảo sát vùng chim yến tại thị xã Điện Bàn cho chủ đầu tư.",
    date: "2026-05-01",
    category: "Kỹ thuật nhà yến",
    image: "https://www.yensaotiensa.com/data/news/2008/khao-sat-vung-chim-yen-tai-thi-xa-dien-ban-4.jpg",
    content: [
      "Vào một ngày cuối tháng 6 đầu tháng 7, đội ngũ Yến Sào Tiên Sa có dịp đến thị xã Điện Bàn để tư vấn, hỗ trợ và khảo sát vùng chim yến cho chủ đầu tư có ý định xây dựng nhà yến.",
      "Bài viết được đưa vào MVP như nội dung tham khảo từ website gốc, giúp phần tin tức giữ được tinh thần thương hiệu hiện tại.",
    ],
  },
  {
    slug: "thi-cong-lap-dat-nha-nuoi-yen-5-tang-tai-eakar-daklak",
    title: "Thi công lắp đặt nhà nuôi yến 5 tầng tại Eakar – Daklak",
    summary: "Đội ngũ kỹ thuật trở lại Daklak để thi công, lắp đặt thiết bị nhà nuôi yến cho khách hàng đã tin tưởng lựa chọn công ty.",
    date: "2026-04-24",
    category: "Kỹ thuật nhà yến",
    image: "https://www.yensaotiensa.com/data/news/2009/thi-cong-lap-dat-nha-nuoi-yen-5-tang-tai-eakar-daklak-8.jpg",
    content: [
      "Đầu tháng 4, các kỹ thuật viên của Yến Sào Tiên Sa trở lại tỉnh Daklak để thi công, lắp đặt thiết bị nhà nuôi yến cho khách hàng.",
      "Nội dung này thể hiện kinh nghiệm kỹ thuật và năng lực triển khai thực tế của thương hiệu trên website gốc.",
    ],
  },
  {
    slug: "mot-so-mo-hinh-nha-yen-pho-bien-hien-nay",
    title: "Một số mô hình nhà yến phổ biến hiện nay",
    summary: "Tìm hiểu các mô hình xây dựng nhà yến phổ biến, phù hợp với điều kiện thời tiết và khí hậu tại Việt Nam.",
    date: "2026-04-17",
    category: "Kỹ thuật nhà yến",
    image: "https://www.yensaotiensa.com/data/news/2010/mot-so-mo-hinh-nha-yen-pho-bien-hien-nay-3.jpg",
    content: [
      "Bài viết giới thiệu một số mô hình nhà yến phổ biến hiện nay, trong đó mô hình xây bằng gạch và bê tông cốt thép được sử dụng rộng rãi.",
      "Nội dung giúp người đọc hiểu thêm về bối cảnh kỹ thuật nhà yến mà website gốc đang truyền tải.",
    ],
  },
  {
    slug: "thi-cong-nha-yen-tai-dak-nong",
    title: "Thi công nhà yến tại Đăk Nông",
    summary: "Bài viết chia sẻ bối cảnh khí hậu, mùa khô, mùa mưa và các yếu tố cần quan tâm khi thi công nhà yến tại Đăk Nông.",
    date: "2026-04-10",
    category: "Kỹ thuật nhà yến",
    image: "https://www.yensaotiensa.com/data/news/2011/thi-cong-nha-yen-tai-dak-nong-8.jpg",
    content: [
      "Đăk Nông có khí hậu nhiệt đới gió mùa với hai mùa rõ rệt, gồm mùa khô và mùa mưa. Đây là yếu tố cần cân nhắc khi khảo sát và thi công nhà yến.",
      "Thông tin này được đưa vào demo như một bài viết kỹ thuật đại diện cho nhóm tin tức trên website gốc.",
    ],
  },
  {
    slug: "thi-cong-nha-yen-tai-daklak",
    title: "Thi công nhà yến tại Daklak",
    summary: "Daklak là địa phương có nhiều ao hồ, thời tiết ôn hòa và địa hình phù hợp để khảo sát, thi công mô hình nhà yến.",
    date: "2026-04-03",
    category: "Kỹ thuật nhà yến",
    image: "https://www.yensaotiensa.com/data/news/2012/thi-cong-nha-yen-tai-daklak-5.jpg",
    content: [
      "Tháng 8, đội ngũ kỹ thuật của Yến Sào Tiên Sa trở lại Daklak để thi công cho các khách hàng đã tin tưởng lựa chọn công ty.",
      "Bài viết nhấn mạnh các điều kiện tự nhiên như ao hồ, thời tiết ôn hòa và địa hình tại địa phương.",
    ],
  },
  {
    slug: "khao-sat-chim-yen-tai-lao",
    title: "Khảo sát chim yến tại Lào",
    summary: "Buổi đầu khảo sát chim yến tại Sekong, một tỉnh phía Nam Lào giáp khu vực miền Trung Việt Nam.",
    date: "2026-03-27",
    category: "Kỹ thuật nhà yến",
    image: "https://www.yensaotiensa.com/data/news/2013/khao-sat-chim-yen-tai-lao-1.jpg",
    content: [
      "Trong buổi đầu khảo sát chim yến tại Lào, đội ngũ đến Sekong, một tỉnh nằm ở phía Nam Lào, giáp các tỉnh miền Trung Việt Nam.",
      "Nội dung này thể hiện phạm vi khảo sát rộng hơn của đội ngũ kỹ thuật nhà yến trên website gốc.",
    ],
  },
  {
    slug: "hue-nghe-nuoi-chim-yen-trong-nha",
    title: "Huế – Nghề nuôi chim yến trong nhà",
    summary: "Câu chuyện khảo sát và kiểm tra đàn yến tại Hương Thủy, Huế trong điều kiện thời tiết mùa đông thuận lợi.",
    date: "2026-03-20",
    category: "Kỹ thuật nhà yến",
    image: "https://www.yensaotiensa.com/data/news/2014/thi-cong-nha-yen-tai-hue-3.jpg",
    content: [
      "Yến Sào Tiên Sa trở lại Huế vào những ngày tháng 11. Dù đang là mùa đông, khí hậu năm đó khá thuận lợi, trời có nắng và ấm.",
      "Công tác thử chim và kiểm tra đàn yến tại Hương Thủy được ghi nhận với kết quả tích cực.",
    ],
  },
  {
    slug: "chi-phi-dau-tu-nuoi-chim-yen",
    title: "Chi phí đầu tư nuôi chim yến",
    summary: "Chi phí xây dựng nhà yến phụ thuộc điều kiện kinh tế, vùng miền, khí hậu và mô hình đầu tư của từng chủ nhà yến.",
    date: "2026-03-13",
    category: "Kỹ thuật nhà yến",
    image: "https://www.yensaotiensa.com/data/news/2015/chi-phi-dau-tu-nuoi-chim-yen-3.jpg",
    content: [
      "Tùy điều kiện kinh tế, vùng miền và khí hậu, mỗi chủ đầu tư có thể xây dựng mô hình nhà yến khác nhau sao cho phù hợp với ngân sách.",
      "Bài viết giúp người đọc có cái nhìn tổng quan hơn về các yếu tố ảnh hưởng đến chi phí đầu tư nuôi chim yến.",
    ],
  },
];
