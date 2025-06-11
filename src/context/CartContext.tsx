'use client'
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface CartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  foto: string;
}

export interface RestauranteCarrinho {
  id: string;
  nome: string;
  telefone: string;
}

interface CartContextType {
  cart: CartItem[];
  restaurante: RestauranteCarrinho | null;
  addToCart: (item: CartItem, restaurante: RestauranteCarrinho) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantidade: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  frete: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [restaurante, setRestaurante] = useState<RestauranteCarrinho | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const frete = 3.00;

  const addToCart = useCallback((item: CartItem, novoRestaurante: RestauranteCarrinho) => {
    setCart(prevCart => {
      // Se o carrinho está vazio ou é do mesmo restaurante
      if (!restaurante || restaurante.id === novoRestaurante.id) {
        if (!restaurante) setRestaurante(novoRestaurante);
        
        const existingItem = prevCart.find(i => i.id === item.id);
        if (existingItem) {
          return prevCart.map(i =>
            i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
          );
        } else {
          return [...prevCart, { ...item, quantidade: 1 }];
        }
      } else {
        // Se é um restaurante diferente, perguntar se quer limpar o carrinho
        if (confirm('Seu carrinho contém itens de outro restaurante. Deseja limpar o carrinho e adicionar este item?')) {
          setRestaurante(novoRestaurante);
          return [{ ...item, quantidade: 1 }];
        }
        return prevCart;
      }
    });
  }, [restaurante]);

  const removeFromCart = useCallback((id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantidade: number) => {
    if (quantidade <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item => 
        item.id === id ? { ...item, quantidade } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    setRestaurante(null);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  return (
    <CartContext.Provider value={{ 
      cart, 
      restaurante,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      isCartOpen,
      toggleCart,
      frete
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};