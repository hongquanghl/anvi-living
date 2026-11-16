'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, Compass, PlayCircle, BookOpen, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenCart?: () => void;
  cartCount?: number;
}

export default function Navbar({ onOpenCart, cartCount = 0 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fcfbf8]/90 backdrop-blur-md border-b border-[#dcd4c5]/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-[#1a1917] group-hover:text-[#9c4826] transition-colors">
              ANVI
            </span>
            <span className="text-xs uppercase font-sans tracking-widest text-[#9c4826] font-semibold hidden sm:inline-block border border-[#9c4826]/30 px-1.5 py-0.5 rounded">
              LIVING
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/events"
              className="flex items-center space-x-1.5 text-sm font-medium text-[#1a1917] hover:text-[#9c4826] transition-colors"
            >
              <Compass className="w-4 h-4 text-[#9c4826]" />
              <span>Sự Kiện & Lễ Hội</span>
            </Link>
            <Link
              href="/tv"
              className="flex items-center space-x-1.5 text-sm font-medium text-[#1a1917] hover:text-[#9c4826] transition-colors"
            >
              <PlayCircle className="w-4 h-4 text-[#9c4826]" />
              <span>Lớp Học Trực Tuyến</span>
            </Link>
            <Link
              href="/journal"
              className="flex items-center space-x-1.5 text-sm font-medium text-[#1a1917] hover:text-[#9c4826] transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#9c4826]" />
              <span>Tạp Chí Mindful</span>
            </Link>
            <Link
              href="/shop"
              className="flex items-center space-x-1.5 text-sm font-medium text-[#1a1917] hover:text-[#9c4826] transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#9c4826]" />
              <span>Cửa Hàng</span>
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-2 text-[#575249] hover:text-[#1a1917] hover:bg-[#f3eee5] rounded-full transition"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/account"
              className="p-2 text-[#575249] hover:text-[#9c4826] hover:bg-[#f3eee5] rounded-full transition"
              aria-label="Tài khoản cá nhân"
            >
              <Sparkles className="w-5 h-5 text-[#9c4826]" />
            </Link>

            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2 text-[#1a1917] hover:text-[#9c4826] hover:bg-[#f3eee5] rounded-full transition flex items-center"
              aria-label="Giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#9c4826] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1a1917] rounded-md hover:bg-[#f3eee5]"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#dcd4c5] bg-[#fcfbf8] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <Link
            href="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#1a1917] hover:text-[#9c4826]"
          >
            Sự Kiện & Lễ Hội 108
          </Link>
          <Link
            href="/tv"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#1a1917] hover:text-[#9c4826]"
          >
            Lớp Học Trực Tuyến (ANVI Studio)
          </Link>
          <Link
            href="/journal"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#1a1917] hover:text-[#9c4826]"
          >
            Tạp Chí Phong Cách Sống & Sức Khỏe
          </Link>
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#1a1917] hover:text-[#9c4826]"
          >
            Cửa Hàng Thảm Tập & Thảo Mộc
          </Link>
        </div>
      )}
    </header>
  );
}
