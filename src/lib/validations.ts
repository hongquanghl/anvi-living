import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z.string().email('Địa chỉ email không hợp lệ'),
  source: z.string().default('footer'),
});

export const ticketCheckoutSchema = z.object({
  eventId: z.string().min(1, 'Mã sự kiện không được trống'),
  tierId: z.string().min(1, 'Mã hạng vé không được trống'),
  quantity: z.number().int().min(1, 'Số lượng tối thiểu là 1').max(10, 'Tối đa 10 vé mỗi lượt'),
  customerName: z.string().min(2, 'Vui lòng nhập họ và tên'),
  customerEmail: z.string().email('Địa chỉ email không hợp lệ'),
  customerPhone: z.string().optional(),
});

export const cartCheckoutSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      price: z.number().nonnegative(),
      quantity: z.number().int().positive(),
      type: z.enum(['ticket', 'product']),
    })
  ).min(1, 'Giỏ hàng trống'),
  customerName: z.string().min(2, 'Vui lòng nhập họ và tên'),
  customerEmail: z.string().email('Địa chỉ email không hợp lệ'),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().optional(),
});
