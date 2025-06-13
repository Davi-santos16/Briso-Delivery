import Link from "next/link";
import Image from "next/image";
import { Star, Clock } from "lucide-react";

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
    <Link
      href={`/restaurantes/${restaurante.id}`}
      className="group block rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-md hover:shadow-lg transition-all"
    >
      {/* Imagem com hover zoom suave */}
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={restaurante.foto}
          alt={`Imagem do restaurante ${restaurante.nome}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {restaurante.nome}
        </h3>

        <div className="flex justify-between text-sm text-gray-600">
          <span className="truncate">{restaurante.categoria}</span>
          <span className="flex items-center gap-1 text-yellow-500 font-medium">
            <Star size={16} />
            {restaurante.avaliacao.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-xs pt-1">
          <Clock size={14} />
          <span>{restaurante.tempoEntrega}</span>
        </div>
      </div>
    </Link>
  );
}
