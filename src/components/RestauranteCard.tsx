import Link from 'next/link';
import Image from 'next/image';

interface Restaurante {
  id: string;
  nome: string;
  foto: string;
  categoria: string;
  tempoEntrega: string;
  avaliacao: number;
}

export default function RestauranteCard({ restaurante }: { restaurante: Restaurante }) {
  return (
    <Link href={`/restaurantes/${restaurante.id}`} className="group">
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-48">
          <Image
            src={restaurante.foto}
            alt={restaurante.nome}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg">{restaurante.nome}</h3>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-600">{restaurante.categoria}</span>
            <span className="flex items-center">
              ⭐ {restaurante.avaliacao} • {restaurante.tempoEntrega}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}