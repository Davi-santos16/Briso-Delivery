'use client'
import { restaurantes } from '@/data/restaurantes';
import FoodCard from '@/components/FoodCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function Page({ params }: { params: { id: string } }) {
  const restaurante = restaurantes.find(r => r.id === params.id);
  
  if (!restaurante) {
    notFound();
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Link 
        href="/" 
        className="inline-flex items-center gap-1 mb-4 text-blue-500 hover:text-blue-700"
      >
        ← Voltar para restaurantes
      </Link>

      <div className="mb-8">
        <div className="relative h-64 w-full rounded-lg overflow-hidden">
          <img
            src={restaurante.foto}
            alt={restaurante.nome}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4">
          <h1 className="text-3xl font-bold">{restaurante.nome}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
              ⭐ {restaurante.avaliacao}
            </span>
            <span className="text-gray-600">{restaurante.tempoEntrega}</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Cardápio</h2>
      
      {restaurante.menu.length === 0 ? (
        <p className="text-gray-500">Nenhum item disponível no momento</p>
      ) : (
        <div className="space-y-4">
          {restaurante.menu.map(comida => (
            <FoodCard 
              key={comida.id} 
              comida={comida} 
              restaurante={{
                id: restaurante.id,
                nome: restaurante.nome,
                telefone: restaurante.telefone
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}