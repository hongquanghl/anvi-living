'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Heart, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f3eee5] border-t border-[#dcd4c5] mt-24">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#dcd4c5]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9c4826]">
              Bản tin chánh niệm
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1917] mt-2">
              Tìm Về Sự Cân Bằng Mỗi Tuần
            </h3>
            <p className="text-[#575249] text-sm mt-3 max-w-md leading-relaxed">
              Nhận thông báo ưu đãi vé lễ hội sớm nhất, bài tập yoga miễn phí và các bài viết nuôi dưỡng tâm hồn từ chuyên gia.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Nhập địa chỉ email của bạn..."
              className="px-4 py-3.5 rounded-full bg-white border border-[#dcd4c5] text-sm text-[#1a1917] focus:outline-none focus:ring-2 focus:ring-[#9c4826] flex-1"
              required
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-[#9c4826] text-white text-sm font-medium hover:bg-[#873c1d] transition shadow-md whitespace-nowrap"
            >
              Đăng Ký Ngay
            </button>
          </form>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif font-bold text-[#1a1917] mb-4 text-base">Sự Kiện</h4>
            <ul className="space-y-2.5 text-sm text-[#575249]">
              <li><Link href="/events" className="hover:text-[#9c4826] transition">Lễ Hội ANVI 108</Link></li>
              <li><Link href="/events" className="hover:text-[#9c4826] transition">Kỳ Nghỉ Dưỡng Retreats</Link></li>
              <li><Link href="/events" className="hover:text-[#9c4826] transition">Workshop Thiền & Âm Thanh</Link></li>
              <li><Link href="/events" className="hover:text-[#9c4826] transition">Lịch Trình Toàn Quốc</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-[#1a1917] mb-4 text-base">Lớp Học Online</h4>
            <ul className="space-y-2.5 text-sm text-[#575249]">
              <li><Link href="/tv" className="hover:text-[#9c4826] transition">Vinyasa Khởi Đầu Ngày Mới</Link></li>
              <li><Link href="/tv" className="hover:text-[#9c4826] transition">Yin Yoga Phục Hồi Cơ Thể</Link></li>
              <li><Link href="/tv" className="hover:text-[#9c4826] transition">Chuông Xoay & Thiền Định</Link></li>
              <li><Link href="/tv" className="hover:text-[#9c4826] transition">Gói Thuê Bao Năm</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-[#1a1917] mb-4 text-base">Tạp Chí & Cộng Đồng</h4>
            <ul className="space-y-2.5 text-sm text-[#575249]">
              <li><Link href="/journal" className="hover:text-[#9c4826] transition">Nghệ Thuật Sống Chậm</Link></li>
              <li><Link href="/journal" className="hover:text-[#9c4826] transition">Khoa Học Hơi Thở</Link></li>
              <li><Link href="/journal" className="hover:text-[#9c4826] transition">Dinh Dưỡng Thực Dưỡng</Link></li>
              <li><Link href="/journal" className="hover:text-[#9c4826] transition">Đội Ngũ Giảng Viên</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-[#1a1917] mb-4 text-base">Về Chúng Tôi</h4>
            <p className="text-xs text-[#575249] leading-relaxed mb-3">
              ANVI Living là không gian kết nối những người đam mê lối sống tỉnh thức, vận động khỏe mạnh và sống chan hòa cùng thiên nhiên.
            </p>
            <p className="text-xs text-[#575249] mb-4">
              <strong>Liên hệ:</strong>{' '}
              <a href="mailto:hoangthuannk@gmail.com" className="text-[#9c4826] font-semibold hover:underline">
                hoangthuannk@gmail.com
              </a>
            </p>
            <div className="flex space-x-3 text-[#575249]">
              <a href="mailto:hoangthuannk@gmail.com" className="p-2 bg-white rounded-full hover:text-[#9c4826] transition shadow-sm" title="Gửi Email"><Mail className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-white rounded-full hover:text-[#9c4826] transition shadow-sm"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-white rounded-full hover:text-[#9c4826] transition shadow-sm"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-white rounded-full hover:text-[#9c4826] transition shadow-sm"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        <div className="pt-10 mt-10 border-t border-[#dcd4c5]/80 flex flex-col sm:flex-row justify-between items-center text-xs text-[#575249] gap-4">
          <p>© 2026 ANVI Living. Thiết kế sạch, hướng tới lối sống bền vững.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">Điều khoản sử dụng</a>
            <a href="#" className="hover:underline">Chính sách bảo mật</a>
            <a href="#" className="hover:underline">Liên hệ hợp tác</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
