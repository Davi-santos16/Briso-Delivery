import RestauranteCard from '@/components/RestauranteCard';
import { restaurantes } from '@/data/restaurantes';

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Restaurantes</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {restaurantes.map((restaurante) => (
          <RestauranteCard key={restaurante.id} restaurante={restaurante} />
        ))}
      </div>
    </div>
  );
}