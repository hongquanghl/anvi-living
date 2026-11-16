'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Play,
  Clock,
  ChevronLeft,
  Bookmark,
  Share2,
  Sparkles,
  Lock,
  CheckCircle,
  Volume2,
} from 'lucide-react';
import { CLASS_VIDEOS } from '@/data/seed';

export default function VideoDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const video = CLASS_VIDEOS.find((v) => v.slug === slug) || CLASS_VIDEOS[0];
  const relatedVideos = CLASS_VIDEOS.filter((v) => v.id !== video.id);

  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#f3eee5] border-b border-[#dcd4c5]/70 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#575249]">
          <Link
            href="/tv"
            className="inline-flex items-center gap-1.5 hover:text-[#9c4826] font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại Thư viện ANVI Studio</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsSaved(!isSaved);
                alert(isSaved ? 'Đã bỏ lưu bài tập' : 'Đã lưu bài tập vào danh sách yêu thích!');
              }}
              className={`p-2 rounded-full border transition flex items-center gap-1.5 text-xs font-semibold ${
                isSaved
                  ? 'bg-[#9c4826] text-white border-[#9c4826]'
                  : 'bg-white text-[#575249] border-[#dcd4c5] hover:text-[#1a1917]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Đã Lưu' : 'Lưu Bài Tập'}</span>
            </button>

            <button
              onClick={() => alert('Đã sao chép liên kết bài tập!')}
              className="p-2 rounded-full bg-white text-[#575249] border border-[#dcd4c5] hover:text-[#1a1917]"
              title="Chia sẻ"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Video & Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Custom Video Player */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-[#dcd4c5]">
              <video
                src={video.videoUrl}
                controls
                autoPlay
                poster={video.thumbnail}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video Info Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#9c4826]/10 text-[#9c4826] text-xs font-bold uppercase tracking-wider">
                  {video.style}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#f3eee5] text-[#575249] text-xs font-medium">
                  {video.level}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#575249] ml-2">
                  <Clock className="w-3.5 h-3.5 text-[#9c4826]" />
                  {video.durationMinutes} phút
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1a1917] leading-tight">
                {video.title}
              </h1>

              <p className="text-sm sm:text-base text-[#575249] mt-4 leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* Instructor Bio Box */}
            <div className="bg-[#f3eee5] rounded-2xl p-6 border border-[#dcd4c5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <img
                  src={video.instructor.avatar}
                  alt={video.instructor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#9c4826] font-bold block">
                    Huấn Luyện Viên Dẫn Dắt
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#1a1917]">
                    {video.instructor.name}
                  </h3>
                  <p className="text-xs text-[#575249]">{video.instructor.title}</p>
                </div>
              </div>
              <p className="text-xs text-[#575249] max-w-xs leading-relaxed">
                {video.instructor.bio}
              </p>
            </div>

            {/* Preparation / Props Needed */}
            <div className="bg-white rounded-2xl p-6 border border-[#dcd4c5]">
              <h3 className="font-serif font-bold text-base text-[#1a1917] mb-3">
                Dụng Cụ Chuẩn Bị Cho Buổi Tập:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#575249]">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1b693e]" />
                  <span>1 Thảm tập Yoga có độ bám tốt</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1b693e]" />
                  <span>1 Khăn trải và bình nước khoáng</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1b693e]" />
                  <span>2 Khối gạch xốp (Yoga Block) nếu có</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1b693e]" />
                  <span>Không gian yên tĩnh, thoáng khí</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Sidebar: Related Classes (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#1a1917]">
              Bài Tập Liên Quan
            </h3>

            <div className="space-y-4">
              {relatedVideos.map((item) => (
                <Link
                  key={item.id}
                  href={`/tv/${item.slug}`}
                  className="group bg-[#f3eee5] rounded-2xl p-3 border border-[#dcd4c5] hover:border-[#9c4826]/50 transition flex gap-3.5 items-center"
                >
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-black">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#9c4826] tracking-wider block">
                      {item.durationMinutes} phút • {item.style}
                    </span>
                    <h4 className="font-serif font-bold text-xs text-[#1a1917] group-hover:text-[#9c4826] transition line-clamp-2 mt-0.5 leading-snug">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-[#575249] block mt-1">
                      {item.instructor.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Membership Promo Box */}
            <div className="bg-gradient-to-br from-[#9c4826] to-[#873c1d] rounded-3xl p-6 text-white shadow-lg">
              <span className="text-xs uppercase font-bold tracking-widest text-[#f4a261]">
                ANVI Studio Pass
              </span>
              <h4 className="font-serif font-bold text-lg mt-1">
                Luyện Tập Không Giới Hạn
              </h4>
              <p className="text-xs text-white/80 mt-2 leading-relaxed">
                Mở khóa hơn 100+ bài tập chuyên sâu từ các huấn luyện viên Thuận Hoàng, Thùy Giang, Bích Huệ.
              </p>
              <Link
                href="/account"
                className="mt-4 block text-center py-2.5 px-4 rounded-full bg-white text-[#9c4826] font-bold text-xs hover:bg-[#fcfbf8] transition shadow"
              >
                Kích Hoạt Gói Hội Viên
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
