import { CartProvider } from '@/context/CartContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Cart from '@/components/Cart';
import CartIcon from '@/components/CartIcon';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Delivery App',
  description: 'Seu app de delivery favorito',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          <header className="bg-red-500 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Delivery App</h1>
            <CartIcon />
          </header>
          {children}
          <Cart />
        </CartProvider>
      </body>
    </html>
  );
}