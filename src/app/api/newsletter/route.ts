import { NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/validations';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = newsletterSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0]?.message || 'Dữ liệu không hợp lệ' },
        { status: 400 }
      );
    }

    const { email, source } = validated.data;

    // Check if Supabase is configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { error } = await supabaseAdmin.from('newsletter_subscribers').upsert(
        { email, source, status: 'subscribed' },
        { onConflict: 'email' }
      );

      if (error) {
        console.error('Supabase newsletter insert error:', error);
        return NextResponse.json(
          { error: 'Không thể đăng ký nhận tin lúc này, vui lòng thử lại sau.' },
          { status: 500 }
        );
      }
    } else {
      console.log(`[Newsletter Mock] Email đăng ký thành công: ${email}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Cảm ơn bạn! Đã đăng ký nhận bản tin chánh niệm thành công.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi máy chủ.' },
      { status: 500 }
    );
  }
}
