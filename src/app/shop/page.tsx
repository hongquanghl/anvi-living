'use client';

import React, { useState } from 'react';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '@/data/seed';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCart();

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      type: 'product',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3eee5] text-[#9c4826] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ANVI Shop</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1a1917] tracking-tight">
          Dụng Cụ Tập & Dược Liệu Tự Nhiên
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#575249] leading-relaxed">
          Tất cả sản phẩm được tuyển chọn kỹ lưỡng theo tiêu chuẩn bền vững, thân thiện với môi trường và an toàn tối đa cho sức khỏe.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {[
          { id: 'all', label: 'Tất Cả Sản Phẩm' },
          { id: 'Thảm & Dụng cụ tập', label: 'Thảm & Khối Tập' },
          { id: 'Thực phẩm thảo mộc', label: 'Trà & Thảo Mộc' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition ${
              selectedCategory === cat.id
                ? 'bg-[#9c4826] text-white shadow-sm'
                : 'bg-[#f3eee5] text-[#575249] hover:bg-white hover:text-[#1a1917]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
}
