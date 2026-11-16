import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ANVI Living | Lễ Hội Thể Thao Tâm Trí & Lối Sống Mindful',
  description: 'Trải nghiệm lễ hội thể thao chánh niệm ANVI 108, các khóa học yoga online, kỳ nghỉ dưỡng retreats và tạp chí phong cách sống tại Việt Nam.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#fcfbf8] text-[#1a1917] font-sans">
        <CartProvider>
          <HeaderWrapper />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
