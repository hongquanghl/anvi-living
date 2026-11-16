# Pricing Strategy: ANVI Living

Chiến lược định giá minh bạch, khắc phục hoàn toàn các khiếu nại về bẫy thanh toán của Wanderlust.

---

## 1. Đối Soát Giá Bản Gốc & Các Nền Tảng Đối Thủ (Tháng 11/2026)

| Nền tảng | Gói dịch vụ | Giá niêm yết (USD & Quy đổi VNĐ) | Nhược điểm người dùng phàn nàn |
|---|---|---|---|
| **Wanderlust TV** | Thuê bao tháng / năm | $18/tháng (~460.000 đ) • $180/năm (~4.600.000 đ) | Khó hủy gói, giấu nút hủy trên app, tự động trừ tiền không báo trước. |
| **Wanderlust 108** | Vé lễ hội 1 ngày | $65 - $150 (~1.650.000 - 3.800.000 đ) | Đắt đỏ, nhiều phụ phí đồ ăn và workshop nhỏ lẻ. |
| **Alo Moves** | Thuê bao video online | $13/tháng (~330.000 đ) • $130/năm (~3.300.000 đ) | 100% tiếng Anh, không có sự kiện thực địa tại Việt Nam. |
| **Các studio Yoga VN** | Thẻ tập tại phòng | 1.500.000 - 3.000.000 đ/tháng | Giới hạn khung giờ cố định, bất tiện di chuyển. |

---

## 2. Mô Hình Giá Của ANVI Living (Minh Bạch & Bản Địa Hóa)

### A. Gói Thành Viên Luyện Tập Trực Tuyến (ANVI Studio Pass)

| Gói | Mức giá | Ai nên chọn? | Quyền lợi bao gồm |
|---|---|---|---|
| **Dùng Thử (Trial)** | **0 đ** (14 ngày) | Người mới bắt đầu | Trải nghiệm không giới hạn mọi bài tập, hủy bất cứ lúc nào không mất phí. |
| **Thành Viên Tháng** | **189.000 đ** / tháng | Học viên linh hoạt | Truy cập toàn bộ 100+ video yoga/thiền, lộ trình trị liệu đau mỏi vai gáy. |
| **Thành Viên Năm** *(Tiết kiệm 35%)* | **1.490.000 đ** / năm | Học viên chuyên cần | Tương đương chỉ ~124.000 đ/tháng. Tặng kèm voucher 300.000 đ mua vé Lễ Hội ANVI 108. |

### Cam kết về thanh toán (Zero-Trap Billing):
1. **Hủy 1-Click trực tiếp:** Nút hủy hiển thị rõ ràng ngay tại trang `/account`.
2. **Thông báo trước 3 ngày:** Email tự động nhắc nhở trước ngày gia hạn tiếp theo.
3. **Hoàn tiền trong 7 ngày đầu:** Nếu không hài lòng vì bất kỳ lý do gì.

---

### B. Vé Tham Dự Lễ Hội Thực Tế (ANVI 108 & Retreats)

1. **Vé Tiêu Chuẩn (Early Bird):** `850.000 đ`
   - Đầy đủ 3 chặng: Chạy bộ 5K + 90 phút Đại hòa âm Yoga + Thiền chuông xoay.
   - Trọn gói quà tặng: Túi tote vải canvas, vòng tay, nước khoáng tự nhiên (Không phụ phí phát sinh).
2. **Vé VIP All-Access:** `1.850.000 đ`
   - Vị trí thảm ưu tiên sát sân khấu chính.
   - Tặng thảm tập yoga cao cấp cao su tự nhiên ANVI Pro.
   - Bữa trưa organic Farm-to-Table giao lưu cùng các Huấn luyện viên (Thuận Hoàng, Thùy Giang, Bích Huệ).
   - Miễn phí 6 tháng tài khoản ANVI Studio.

---

## 3. Danh Mục Sản Phẩm Cần Tạo Trên Stripe:
- `prod_anvi_pass_monthly`: 189.000 VND / month
- `prod_anvi_pass_annual`: 1.490.000 VND / year
- `prod_anvi_108_standard`: 850.000 VND (One-time)
- `prod_anvi_108_vip`: 1.850.000 VND (One-time)
