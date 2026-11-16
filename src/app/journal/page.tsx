'use client';

import React, { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { ARTICLES } from '@/data/seed';
import ArticleCard from '@/components/ArticleCard';

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = ARTICLES.filter((art) => {
    const matchCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3eee5] text-[#9c4826] text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>ANVI Journal</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1a1917] tracking-tight">
          Tạp Chí Lối Sống & Chánh Niệm
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#575249] leading-relaxed">
          Góc nhìn sâu sắc về dinh dưỡng thực dưỡng, khoa học hơi thở, thiền định và những câu chuyện truyền cảm hứng sống trọn vẹn từng ngày.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#f3eee5] p-4 sm:p-6 rounded-2xl border border-[#dcd4c5]/80 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'Tất Cả Bài Viết' },
            { id: 'Lối sống Mindful', label: 'Sống Mindful' },
            { id: 'Thực hành Yoga', label: 'Thực Hành Yoga' },
            { id: 'Dinh dưỡng thực dưỡng', label: 'Thực Dưỡng' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-[#9c4826] text-white shadow-sm'
                  : 'bg-white text-[#575249] hover:text-[#1a1917]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#575249] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            className="w-full pl-9 pr-4 py-2 bg-white rounded-full border border-[#dcd4c5] text-xs text-[#1a1917] focus:outline-none focus:ring-1 focus:ring-[#9c4826]"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
