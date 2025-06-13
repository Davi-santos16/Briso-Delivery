'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { RestauranteCarrinho } from '@/context/CartContext';
import { Plus } from 'lucide-react';

interface Tamanho {
  tamanho: string;
  preco: number;
}

interface Item {
  id: string;
  nome: string;
  descricao: string;
  foto: string;
  preco?: number;
  tamanhos?: Tamanho[];
}

interface Categoria {
  categoria: string;
  itens: Item[];
}

export default function CategoriaSection({
  categoria,
  restaurante,
}: {
  categoria: Categoria;
  restaurante: RestauranteCarrinho;
}) {
  return (
    <div className="mb-12" id={categoria.categoria.replace(/\s+/g, '-').toLowerCase()}>
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">{categoria.categoria}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categoria.itens.map((item) => (
          <ItemCard key={item.id} item={item} restaurante={restaurante} />
        ))}
      </div>
    </div>
  );
}

function ItemCard({
  item,
  restaurante,
}: {
  item: Item;
  restaurante: RestauranteCarrinho;
}) {
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

    addToCart(
      {
        id: item.id + (item.tamanhos ? `-${tamanhoSelecionado}` : ''),
        nome: nomeCompleto,
        preco: preco,
        foto: item.foto,
        quantidade: 1,
      },
      restaurante
    );
  };

  return (
    <div className="border rounded-2xl p-4 flex flex-col h-full shadow-md hover:shadow-lg transition-all">
      <div className="flex gap-4">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={item.foto}
            alt={item.nome}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-lg">{item.nome}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.descricao}</p>

          {item.tamanhos && item.tamanhos.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tamanhos.map((tamanho, index) => (
                <button
                  key={index}
                  onClick={() => setTamanhoSelecionado(index)}
                  className={`px-3 py-1 rounded-full border text-sm font-medium transition-all 
                    ${tamanhoSelecionado === index
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
                  `}
                >
                  {tamanho.tamanho} • R$ {tamanho.preco.toFixed(2)}
                </button>
              ))}
            </div>
          )}

          {!item.tamanhos && item.preco !== undefined && (
            <p className="font-bold mt-2 text-base text-red-600">
              R$ {item.preco.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 self-end"
      >
        <Plus size={16} /> Adicionar
      </button>
    </div>
  );
}
