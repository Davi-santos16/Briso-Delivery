'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface Tamanho {
  tamanho: string;
  preco: number;
}

interface Item {
  id: string;
  nome: string;
  descricao: string;
  foto?: string;
  preco?: number;
  tamanhos?: Tamanho[];
}

interface Categoria {
  categoria: string;
  itens: Item[];
}

interface Restaurante {
  id: string;
  nome: string;
  telefone: string;
  // outros campos que tiver
}

interface CartItem {
  id: string;
  nome: string;
  preco: number;
  foto: string;
  quantidade: number;
}

export default function CategoriaSection({ categoria, restaurante }: { categoria: Categoria; restaurante: Restaurante }) {
  return (
    <div className="mb-8" id={categoria.categoria.replace(/\s+/g, '-').toLowerCase()}>
      <h2 className="text-xl font-bold mb-4 border-b pb-2">{categoria.categoria}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoria.itens.map(item => (
          <ItemCard 
            key={item.id} 
            item={item} 
            restaurante={restaurante} 
          />
        ))}
      </div>
    </div>
  );
}

function ItemCard({ item, restaurante }: { item: Item; restaurante: Restaurante }) {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<number>(0);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    let preco = item.preco;
    let nomeCompleto = item.nome;

    if (item.tamanhos && item.tamanhos.length > 0) {
      preco = item.tamanhos[tamanhoSelecionado].preco;
      nomeCompleto = `${item.nome} - ${item.tamanhos[tamanhoSelecionado].tamanho}`;
    }

    if (preco === undefined) return;

    const foto = item.foto ?? '/images/fallback.png'; // fallback caso não tenha foto
    const id = item.tamanhos && item.tamanhos.length > 0
      ? `${item.id}-${tamanhoSelecionado}`
      : item.id;

    const cartItem: CartItem = {
      id,
      nome: nomeCompleto,
      preco,
      foto,
      quantidade: 1,
    };

    addToCart(cartItem, restaurante);
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col h-full">
      <div className="flex gap-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={item.foto ?? '/images/fallback.png'}
            alt={item.nome}
            fill
            className="object-cover rounded"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold">{item.nome}</h3>
          <p className="text-gray-600 text-sm mt-1">{item.descricao}</p>
          
          {item.tamanhos && item.tamanhos.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {item.tamanhos.map((tamanho, index) => (
                  <button
                    key={index}
                    onClick={() => setTamanhoSelecionado(index)}
                    className={`px-3 py-1 text-xs rounded-full transition-all ${
                      tamanhoSelecionado === index
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tamanho.tamanho}
                    <div className="font-bold mt-1">R$ {tamanho.preco.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!item.tamanhos && item.preco !== undefined && (
            <p className="font-bold mt-2 text-lg">R$ {item.preco.toFixed(2)}</p>
          )}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors self-end"
      >
        Adicionar
      </button>
    </div>
  );
}
