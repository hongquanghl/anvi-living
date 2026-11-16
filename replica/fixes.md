# Customer Feedback Analysis & Action Plan: ANVI Living

Tài liệu phân tích chuyên sâu tiếng nói khách hàng thực tế (Reddit, App Store, Trustpilot) từ bản gốc Wanderlust theo kỹ năng `replica-entrepreneur`.

---

## 1. Ba Danh Sách Cốt Lõi (Từ Phản Hồi Thực Tế Của Người Dùng)

### 1. Điều người dùng thất vọng nhất (What they hate)
- **Thương mại hóa & Phù phiếm (Commercialism & Vanity):**  
  > *"Cảm giác như một lễ hội thời trang khoe khoang hơn là một khóa tu dưỡng tinh thần sâu sắc. Quá nhiều nhà tài trợ thương mại ồn ào đặt cạnh các khu vực thiền định."*  
  *(Reddit r/yoga & Trustpilot)*
- **Bẫy gia hạn tự động & Khó hủy gói (Billing & Subscription Traps):**  
  > *"Không có nút hủy đăng ký trực tiếp trong ứng dụng. Bị trừ tiền tự động sau kỳ dùng thử mà không có bất kỳ email thông báo trước nào."*  
  *(Apple App Store & Trustpilot)*
- **Chi phí đắt đỏ với nhiều phụ phí ẩn (Exorbitant Hidden Costs):**  
  > *"Vé tham dự đắt đỏ, cộng thêm tiền phòng khách sạn và các phí workshop riêng lẻ khiến chuyến đi tốn kém hàng ngàn USD."*  
  *(Reddit r/yoga)*

### 2. Những tính năng còn thiếu mà người dùng đòi hỏi (What is missing)
- **Lộ trình cá nhân hóa cho người mới hoặc người có bệnh lý (Personalized Beginner Paths):**  
  > *"Chất lượng video tốt nhưng thiếu lộ trình riêng cho người mới bắt đầu hoặc người bị đau mỏi lưng, khớp."*  
  *(Apple App Store)*
- **Lịch trình thông minh chống quá tải thể lực (Smart Pacing Guide):**  
  Người tham gia thường đăng ký quá nhiều lớp tập cường độ cao trong ngày dẫn đến kiệt sức và chấn thương ngay ngày thứ 2.
- **Hệ thống đặt chỗ lớp học minh bạch:**  
  Không còn cảnh lớp học yêu thích bị kín chỗ trong vài giây dẫn đến xếp hàng mệt mỏi tại hiện trường.

### 3. Những đối tượng bị bỏ quên (What is unsolved)
- Những người tìm kiếm **sự tĩnh lặng thực chất và chữa lành chiều sâu**, không thích sự ồn ào phô trương của các lễ hội âm nhạc phong cách tiệc tùng.
- Khách hàng nội địa tại Việt Nam muốn tham gia các hoạt động chánh niệm với chi phí hợp lý, minh bạch và bằng 100% tiếng Việt.

---

## 2. Kế Hoạch Cải Tiến Sản Phẩm (The Fix Plan cho ANVI Living)

| # | Hạng mục cải tiến | Vấn đề của bản gốc được giải quyết | Quy mô | Kỹ năng phụ trách | Giải pháp trên ANVI Living |
|---|---|---|---|---|---|
| **F01** | **Chính sách Huỷ Gói 1-Click & Nhắc Hạn Minh Bạch** | Bẫy trừ tiền tự động, giấu nút hủy của Wanderlust TV | **S** | `replica-backend` | Thêm nút "Hủy Gói Thành Viên" trực tiếp tại trang `/account`, hệ thống gửi email cảnh báo 3 ngày trước khi gia hạn. |
| **F02** | **Giá Vé Trọn Gói Minh Bạch (All-Inclusive Pricing)** | Phụ phí ẩn và chi phí đắt đỏ | **S** | `replica-build` | Giá vé hiển thị theo VNĐ đã bao gồm đầy đủ thảm tập, nước uống, bữa trưa dinh dưỡng Farm-to-Table, cam kết không phụ phí ẩn. |
| **F03** | **Lộ Trình Cân Bằng Thân - Tâm (Pacing Schedule)** | Học viên kiệt sức vì xếp lịch tập quá dày | **M** | `replica-design` | Phân bổ nhịp điệu lễ hội khoa học: xen kẽ giữa Vinyasa vận động mạnh và Yin Yoga / Thiền chuông phục hồi. |
| **F04** | **Trải Nghiệm Tinh Gọn, Tôn Trọng Không Gian Tĩnh Lặng** | Sự kiện bị biến tướng thành hội chợ thương mại ồn ào | **M** | `replica-brand` | Quy hoạch phân khu nghiêm ngặt: Khu thiền & âm thanh hoàn toàn tách biệt khỏi khu chợ phiên, không phát nhạc điện tử ồn ào. |
| **F05** | **Gợi Ý Bài Tập Trị Liệu Cho Người Mới** | Thiếu phân loại cho người bị đau vai gáy/lưng | **M** | `replica-build` | Bổ sung bộ lọc chuyên biệt: *Dành cho người mới, Phục hồi vai gáy văn phòng, Trị liệu giấc ngủ* trên ANVI Studio. |

---

## 3. Định Vị Khác Biệt Của ANVI Living (Positioning Angles)

Ba góc định vị giúp ANVI Living chiến thắng thị trường:

### Góc 1: Chữa lành thực chất, nói không với phô trương (Authentic Healing) *(Khuyên dùng)*
> *"Dành cho những người yêu thích Yoga và lối sống chánh niệm nhưng cảm thấy ngột ngạt trước những lễ hội thương mại hóa khoe mẽ. **ANVI Living** mang đến những không gian tĩnh lặng nguyên bản giữa rừng thông Đà Lạt hay sông nước Hội An, nơi bạn thực sự được lắng nghe và nuôi dưỡng thân tâm."*

### Góc 2: Minh bạch, tôn trọng tự do khách hàng (Zero-Trap Subscription)
> *"Dành cho những học viên e ngại các ứng dụng yoga trừ tiền ngầm và khó hủy đăng ký. **ANVI Studio** cam kết hủy gói chỉ với 1 cú nhấp chuột tại tài khoản, thông báo trước hạn và bảo vệ quyền lợi tối đa cho học viên."*

### Góc 3: Lối sống cân bằng bền vững cho người Việt hiện đại (Holistic Local Wellness)
> *"Dành cho giới trẻ và nhân viên văn phòng Việt Nam đang đối mặt với stress và kiệt sức đô thị. **ANVI Living** cung cấp giải pháp trọn vẹn kết hợp chạy bộ nhẹ nhàng, yoga trị liệu và dinh dưỡng thảo mộc bản địa với chi phí hoàn toàn hợp lý."*
