/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';

interface Tamanho {
  id: string;
  tamanho: string;
  preco: number;
}

interface MenuItem {
  id: string;
  nome: string;
  descricao: string;
  foto: string;
  categoria: string;
  tamanhos?: Tamanho[];
  preco?: number;
}

interface Restaurante {
  id: string;
  nome: string;
  telefone: string;
}

interface MenuProps {
  menu: MenuItem[];
  restaurante: Restaurante;
}

export default function Menu({ menu, restaurante }: MenuProps) {
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const categorias = menu.reduce((acc, item) => {
    if (!acc[item.categoria]) acc[item.categoria] = [];
    acc[item.categoria].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const handleSelectSize = (itemId: string, tamanhoId: string) => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: tamanhoId }));
  };

  const handleAdd = (item: MenuItem) => {
    if (item.tamanhos && item.tamanhos.length > 0) {
      const tamanhoId = selectedSizes[item.id];
      if (!tamanhoId) {
        alert('Por favor, selecione um tamanho.');
        return;
      }
      const tamanhoSelecionado = item.tamanhos.find(t => t.id === tamanhoId);
      if (!tamanhoSelecionado) return;

      addToCart({
        id: tamanhoSelecionado.id,
        nome: `${item.nome} - ${tamanhoSelecionado.tamanho}`,
        preco: tamanhoSelecionado.preco,
        foto: item.foto,
        quantidade: 1
      }, restaurante);
    } else {
      addToCart({
        id: item.id,
        nome: item.nome,
        preco: item.preco || 0,
        foto: item.foto,
        quantidade: 1
      }, restaurante);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      {Object.entries(categorias).map(([categoria, items]) => (
        <section key={categoria} id={categoria.replace(/\s+/g, '-').toLowerCase()}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2 flex items-center gap-2">
            <span>🍽️</span> <span>{categoria}</span>
          </h2>

          <div className="grid gap-6">
            {items.map(item => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow bg-white flex flex-col md:flex-row"
              >
                {/* Imagem do produto */}
                <div className="md:w-40 h-40 md:h-auto relative">
                  <img
                    src={item.foto}
                    alt={item.nome}
                    className="object-cover w-full h-full md:rounded-l-2xl"
                  />
                </div>

                {/* Detalhes do produto */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.nome}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.descricao}</p>

                    {/* Tamanhos */}
                    {item.tamanhos?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tamanhos.map(tamanho => (
                          <button
                            key={tamanho.id}
                            onClick={() => handleSelectSize(item.id, tamanho.id)}
                            className={`px-3 py-1 text-sm rounded-full border transition-all font-medium
                              ${
                                selectedSizes[item.id] === tamanho.id
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                              }`}
                          >
                            {tamanho.tamanho} • R$ {tamanho.preco.toFixed(2)}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-3 text-lg font-bold text-green-700">
                        R$ {item.preco?.toFixed(2)}
                      </div>
                    )}
                  </div>

                  {/* Botão adicionar */}
                  <div className="mt-4 md:mt-0 md:self-end">
                    <button
                      onClick={() => handleAdd(item)}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-4 py-2 rounded-xl transition transform hover:scale-105"
                    >
                      <Plus size={18} />
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
