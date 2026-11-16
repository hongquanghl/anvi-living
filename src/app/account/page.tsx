'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Ticket,
  Bookmark,
  ShoppingBag,
  QrCode,
  Calendar,
  MapPin,
  Clock,
  Play,
  LogOut,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { EVENTS, CLASS_VIDEOS } from '@/data/seed';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'tickets' | 'saved' | 'orders' | 'login'>('tickets');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>('hoangthuannk@gmail.com');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Profile Header */}
      <div className="bg-[#f3eee5] rounded-3xl p-6 sm:p-10 border border-[#dcd4c5] mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#9c4826] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
            TH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1917]">
                Thuận Hoàng
              </h1>
              <span className="bg-[#1b693e] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                Hội viên ANVI Pass
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#575249] mt-1">{userEmail}</p>
            <p className="text-xs text-[#9c4826] font-medium mt-1">Thành viên từ tháng 11/2026</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="px-5 py-2.5 rounded-full bg-white border border-[#dcd4c5] text-xs font-semibold text-[#575249] hover:text-[#9c4826] hover:border-[#9c4826] transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isLoggedIn ? 'Đăng Xuất' : 'Đăng Nhập Lại'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-[#dcd4c5] mb-8 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`pb-4 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'tickets'
              ? 'border-[#9c4826] text-[#9c4826]'
              : 'border-transparent text-[#575249] hover:text-[#1a1917]'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>Ví Vé Điện Tử (2)</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-4 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'saved'
              ? 'border-[#9c4826] text-[#9c4826]'
              : 'border-transparent text-[#575249] hover:text-[#1a1917]'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Bài Tập Đã Lưu (3)</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-[#9c4826] text-[#9c4826]'
              : 'border-transparent text-[#575249] hover:text-[#1a1917]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Đơn Hàng Cửa Hàng (1)</span>
        </button>

        <button
          onClick={() => setActiveTab('membership' as any)}
          className={`pb-4 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
            (activeTab as any) === 'membership'
              ? 'border-[#9c4826] text-[#9c4826]'
              : 'border-transparent text-[#575249] hover:text-[#1a1917]'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Quản Lý Gói Hội Viên (Minh Bạch)</span>
        </button>
      </div>

      {/* Tab 1: Ticket Wallet */}
      {activeTab === 'tickets' && (
        <div className="space-y-6">
          <div className="bg-[#f3eee5] rounded-3xl p-6 sm:p-8 border border-[#dcd4c5] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="px-3 py-1 bg-[#9c4826] text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                Vé Đã Thanh Toán • Hợp Lệ
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1a1917]">
                {EVENTS[0].title}
              </h3>
              <p className="text-xs text-[#575249]">
                Mã đơn hàng: <strong className="text-[#1a1917]">#WL-982142</strong> • Hạng vé: <strong>Vé Tiêu Chuẩn Early Bird (2 vé)</strong>
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-[#575249] pt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#9c4826]" />
                  19/12/2026 (06:30 - 17:00)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#9c4826]" />
                  Rừng Thông Hồ Tuyền Lâm, Đà Lạt
                </span>
              </div>
            </div>

            <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-[#dcd4c5] text-center flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-[#fcfbf8] border-2 border-dashed border-[#9c4826] rounded-xl flex items-center justify-center mb-2">
                <QrCode className="w-16 h-16 text-[#1a1917]" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#1a1917] tracking-widest">
                QR: WL-2026-DL-88
              </span>
              <span className="text-[10px] text-[#575249] mt-0.5">Xuất trình tại quầy check-in sự kiện</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Saved Classes */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLASS_VIDEOS.map((vid) => (
            <div key={vid.id} className="bg-[#f3eee5] rounded-2xl overflow-hidden border border-[#dcd4c5] p-4 flex flex-col justify-between">
              <div>
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full aspect-video rounded-xl object-cover mb-3"
                />
                <span className="text-[10px] uppercase font-bold text-[#9c4826] tracking-wider block">
                  {vid.style} • {vid.durationMinutes} phút
                </span>
                <h4 className="font-serif font-bold text-base text-[#1a1917] line-clamp-2 mt-1">
                  {vid.title}
                </h4>
              </div>
              <div className="mt-4 pt-3 border-t border-[#dcd4c5] flex items-center justify-between">
                <span className="text-xs text-[#575249]">{vid.instructor.name}</span>
                <Link
                  href="/tv"
                  className="px-3.5 py-1.5 rounded-full bg-[#9c4826] text-white text-xs font-semibold hover:bg-[#873c1d] transition flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Vào Học</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Shop Orders */}
      {activeTab === 'orders' && (
        <div className="bg-[#f3eee5] rounded-3xl p-6 sm:p-8 border border-[#dcd4c5]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#dcd4c5] gap-2">
            <div>
              <span className="text-xs font-bold uppercase text-[#1b693e]">Đang Giao Hàng</span>
              <h4 className="font-serif font-bold text-lg text-[#1a1917]">Đơn hàng #WL-SH-3301</h4>
              <p className="text-xs text-[#575249]">Đặt ngày 12/11/2026</p>
            </div>
            <span className="font-serif font-bold text-xl text-[#9c4826]">1.450.000 đ</span>
          </div>
          <div className="py-4 flex gap-4 items-center">
            <img
              src="https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=200&q=80"
              alt="Thảm yoga"
              className="w-16 h-16 rounded-xl object-cover bg-white"
            />
            <div>
              <h5 className="font-serif font-bold text-sm text-[#1a1917]">
                Thảm Yoga Định Tuyến Cao Su Tự Nhiên ANVI Pro
              </h5>
              <p className="text-xs text-[#575249]">Số lượng: 1 • Màu Rêu Đất (Forest Green)</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Membership Management (Fix for subscription trap) */}
      {(activeTab as any) === 'membership' && (
        <div className="bg-[#f3eee5] rounded-3xl p-6 sm:p-8 border border-[#dcd4c5] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#dcd4c5] gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1b693e]">
                Gói Đang Hoạt Động
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1a1917] mt-1">
                ANVI Studio Pass (Gói Năm Thư Thái)
              </h3>
              <p className="text-xs text-[#575249] mt-1">
                Phí định kỳ: <strong>1.890.000 đ / năm</strong> (Tự động gia hạn vào 16/11/2027)
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-[#1b693e]/15 text-[#1b693e] text-xs font-bold border border-[#1b693e]/30">
              Đã kích hoạt quyền lợi
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#dcd4c5]">
            <h4 className="font-serif font-bold text-sm text-[#1a1917] mb-2">Cam Kết Minh Bạch Của ANVI:</h4>
            <ul className="text-xs text-[#575249] space-y-1.5 mb-5">
              <li>• Chúng tôi luôn gửi email nhắc nhở trước 03 ngày nếu có đợt gia hạn.</li>
              <li>• Bạn có quyền hủy gói bất cứ lúc nào chỉ với 1 cú nhấp chuột bên dưới.</li>
              <li>• Không giấu nút hủy, không phụ phí phát sinh.</li>
            </ul>
            <button
              onClick={() => alert('Đã hủy gia hạn tự động thành công! Bạn vẫn có toàn quyền xem các lớp học cho đến hết ngày 16/11/2027.')}
              className="px-5 py-2.5 rounded-full bg-white text-[#b82b2b] border border-[#b82b2b] hover:bg-[#b82b2b] hover:text-white transition text-xs font-bold shadow-sm"
            >
              Hủy Gia Hạn Gói Hội Viên (1-Click)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
