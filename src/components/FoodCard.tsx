'use client'
import { useCart } from '@/context/CartContext';

interface Comida {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  foto: string;
}

interface Restaurante {
  id: string;
  nome: string;
  telefone: string;
}

export default function FoodCard({ comida, restaurante }: { comida: Comida; restaurante: Restaurante }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: comida.id,
      nome: comida.nome,
      preco: comida.preco,
      foto: comida.foto,
    }, {
      id: restaurante.id,
      nome: restaurante.nome,
      telefone: restaurante.telefone
    });
  };

  return (
    <div className="border rounded-lg p-4 flex gap-4 items-start">
      <div className="relative w-24 h-24 flex-shrink-0">
        <img
          src={comida.foto}
          alt={comida.nome}
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-bold">{comida.nome}</h3>
        <p className="text-gray-600 text-sm mt-1">{comida.descricao}</p>
        <p className="font-bold mt-2 text-lg">R$ {comida.preco.toFixed(2)}</p>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
      >
        Adicionar
      </button>
    </div>
  );
}