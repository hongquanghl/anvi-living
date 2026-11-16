import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || 're_placeholder';
export const resend = new Resend(resendApiKey);

const SENDER = process.env.EMAIL_FROM || 'ANVI Living <hoangthuannk@gmail.com>';

export async function sendTicketConfirmationEmail({
  email,
  customerName,
  eventTitle,
  tierName,
  quantity,
  orderNumber,
  eventDate,
  location,
}: {
  email: string;
  customerName: string;
  eventTitle: string;
  tierName: string;
  quantity: number;
  orderNumber: string;
  eventDate: string;
  location: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email Mock] Vé đã được gửi tới ${email} cho đơn hàng #${orderNumber}`);
    return { success: true, mock: true };
  }

  return await resend.emails.send({
    from: SENDER,
    to: email,
    subject: `[ANVI Living] Vé điện tử xác nhận: ${eventTitle} (#${orderNumber})`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1917; background: #fcfbf8; border-radius: 16px; border: 1px solid #dcd4c5;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #9c4826; font-size: 26px; margin: 0;">ANVI LIVING</h1>
          <p style="color: #575249; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Xác Nhận Đặt Vé Lễ Hội</p>
        </div>
        <p>Xin chào <strong>${customerName}</strong>,</p>
        <p>Chúc mừng bạn đã giữ chỗ thành công cho hành trình chánh niệm và kết nối tại <strong>${eventTitle}</strong>.</p>
        
        <div style="background: #f3eee5; padding: 20px; border-radius: 12px; margin: 24px 0; border: 1px solid #dcd4c5;">
          <h3 style="margin-top: 0; color: #1a1917;">Thông Tin Vé Tham Dự:</h3>
          <p style="margin: 6px 0;"><strong>Mã đơn hàng:</strong> #${orderNumber}</p>
          <p style="margin: 6px 0;"><strong>Hạng vé:</strong> ${tierName}</p>
          <p style="margin: 6px 0;"><strong>Số lượng:</strong> ${quantity} vé</p>
          <p style="margin: 6px 0;"><strong>Thời gian:</strong> ${eventDate}</p>
          <p style="margin: 6px 0;"><strong>Địa điểm:</strong> ${location}</p>
        </div>

        <p style="font-size: 13px; color: #575249;">
          Vui lòng lưu lại email này để xuất trình mã vé tại quầy Check-in sự kiện.
        </p>
        <hr style="border: none; border-top: 1px solid #dcd4c5; margin: 24px 0;" />
        <p style="font-size: 12px; color: #575249; text-align: center;">
          ANVI Living • Tìm về sự cân bằng, nuôi dưỡng thân & tâm.
        </p>
      </div>
    `,
  });
}
