'use client';

import React from 'react';
import Navbar from './Navbar';
import { useCart } from '@/context/CartContext';

export default function HeaderWrapper() {
  const { cartCount, openCart } = useCart();
  return <Navbar cartCount={cartCount} onOpenCart={openCart} />;
}
