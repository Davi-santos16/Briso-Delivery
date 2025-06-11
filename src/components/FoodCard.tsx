'use client'

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

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

  // Agrupa itens por categoria
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
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6">
      {Object.entries(categorias).map(([categoria, items]) => (
        <section key={categoria}>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">{categoria}</h2>

          <div className="flex flex-col gap-6">
            {categoria === 'Pizzas' ? (
              items.map(item => (
                <div key={item.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4">
                  <img src={item.foto} alt={item.nome} className="w-32 h-24 object-cover rounded" />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.nome}</h3>
                    <p className="text-gray-600 text-sm">{item.descricao}</p>

                    <div className="mt-2 flex gap-3 flex-wrap">
                      {item.tamanhos?.map(tamanho => (
                        <button
                          key={tamanho.id}
                          className={`px-3 py-1 rounded border ${
                            selectedSizes[item.id] === tamanho.id
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300'
                          }`}
                          onClick={() => handleSelectSize(item.id, tamanho.id)}
                          type="button"
                        >
                          {tamanho.tamanho} - R$ {tamanho.preco.toFixed(2)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdd(item)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md self-start md:self-auto"
                  >
                    Adicionar
                  </button>
                </div>
              ))
            ) : (
              items.map(item => (
                <div key={item.id} className="border rounded-lg p-4 flex items-center gap-4">
                  <img src={item.foto} alt={item.nome} className="w-24 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.nome}</h3>
                    <p className="text-gray-600 text-sm">{item.descricao}</p>
                  </div>
                  <div className="font-bold text-lg">R$ {item.preco?.toFixed(2)}</div>
                  <button
                    onClick={() => handleAdd(item)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  >
                    Adicionar
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
