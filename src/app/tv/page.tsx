'use client';

import React, { useState } from 'react';
import { PlayCircle, Filter, Sparkles, Lock, X } from 'lucide-react';
import { CLASS_VIDEOS } from '@/data/seed';
import VideoCard from '@/components/VideoCard';
import { ClassVideo } from '@/types';

export default function TvPage() {
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<ClassVideo | null>(null);

  const filteredVideos = CLASS_VIDEOS.filter((v) => {
    if (selectedStyle === 'all') return true;
    return v.style === selectedStyle;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3eee5] text-[#9c4826] text-xs font-semibold uppercase tracking-wider mb-3">
          <PlayCircle className="w-3.5 h-3.5" />
          <span>ANVI Studio Trực Tuyến</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1a1917] tracking-tight">
          Lớp Học Yoga & Thiền Định
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#575249] leading-relaxed">
          Tập luyện mọi lúc, mọi nơi cùng các huấn luyện viên giàu kinh nghiệm. Thư viện bài tập đa dạng từ thư giãn sâu đến tăng cường thể lực.
        </p>
      </div>

      {/* Subscription Callout Banner */}
      <div className="bg-gradient-to-r from-[#9c4826] to-[#873c1d] rounded-3xl p-8 sm:p-12 text-white mb-14 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#f4a261]">
            Đặc quyền hội viên
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
            Mở Khóa Toàn Bộ 200+ Video Độc Quyền
          </h2>
          <p className="text-white/80 text-sm mt-2 max-w-xl">
            Chỉ từ 199.000 đ/tháng. Xem không giới hạn trên mọi thiết bị máy tính, iPad và điện thoại. Dễ dàng hủy bất cứ lúc nào.
          </p>
        </div>
        <button
          onClick={() => alert('Chức năng đăng ký gói thành viên ANVI Pass')}
          className="px-8 py-4 rounded-full bg-white text-[#9c4826] font-bold text-sm hover:bg-[#fcfbf8] transition shadow-md whitespace-nowrap"
        >
          Dùng Thử 14 Ngày Miễn Phí
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {[
          { id: 'all', label: 'Tất Cả Thể Loại' },
          { id: 'Vinyasa Yoga', label: 'Vinyasa Flow' },
          { id: 'Yin Yoga', label: 'Yin Yoga Thư Giãn' },
          { id: 'Thiền định', label: 'Thiền Định Tâm Trí' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedStyle(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition ${
              selectedStyle === tab.id
                ? 'bg-[#9c4826] text-white shadow-sm'
                : 'bg-[#f3eee5] text-[#575249] hover:bg-white hover:text-[#1a1917]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} onClick={() => setActiveVideo(video)} className="cursor-pointer">
            <VideoCard video={video} />
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#1a1917] rounded-3xl overflow-hidden max-w-4xl w-full border border-white/20 shadow-2xl">
            <div className="p-4 border-b border-white/10 flex items-center justify-between text-white">
              <div>
                <span className="text-xs uppercase text-[#f4a261] font-bold">
                  {activeVideo.style} • {activeVideo.durationMinutes} phút
                </span>
                <h3 className="font-serif font-bold text-lg">{activeVideo.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Element */}
            <div className="relative aspect-video bg-black">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 bg-[#24221f] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={activeVideo.instructor.avatar}
                  alt={activeVideo.instructor.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs text-white/60">Giảng viên</div>
                  <div className="font-serif font-bold text-sm">{activeVideo.instructor.name}</div>
                </div>
              </div>
              <p className="text-xs text-white/70 max-w-md">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
