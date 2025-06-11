'use client'
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

export default function CartIcon() {
  const { cart, toggleCart, restaurante } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantidade, 0);

  const [animate, setAnimate] = useState(false);

  // Quando o cart mudar, dispara a animação
  useEffect(() => {
    if (itemCount > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 300); // duração da animação
      return () => clearTimeout(timeout);
    }
  }, [itemCount]);

  return (
    <div
      className={`relative cursor-pointer ${animate ? 'animate-pulse' : ''}`}
      onClick={toggleCart}
      aria-label="Abrir carrinho"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
      {restaurante && cart.length > 0 && (
        <span className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1 truncate max-w-[100px] overflow-hidden">
          {restaurante.nome}
        </span>
      )}
    </div>
  );
}
