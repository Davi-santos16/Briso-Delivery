'use client';

import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

export default function CartIcon() {
  const { cart, toggleCart, restaurante } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantidade, 0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (itemCount > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [itemCount]);

  return (
    <div
      onClick={toggleCart}
      className={`
        fixed z-50 
        bottom-6 right-6 md:top-6 md:bottom-auto md:right-8
        bg-white rounded-full shadow-xl 
        p-3 cursor-pointer 
        transition-transform duration-300 hover:scale-105 
        ${animate ? 'animate-pulse' : ''}
      `}
      aria-label="Abrir carrinho"
    >
      {/* Ícone do carrinho */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>

      {/* Quantidade de itens */}
      {itemCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
          {itemCount}
        </span>
      )}

      {/* Nome do restaurante */}
      {restaurante && cart.length > 0 && (
        <span className="absolute -bottom-3 right-0 bg-blue-500 text-white text-[10px] font-medium rounded-full px-2 py-0.5 truncate max-w-[120px] shadow-sm">
          {restaurante.nome}
        </span>
      )}
    </div>
  );
}
