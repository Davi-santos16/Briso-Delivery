import RestauranteCard from '@/components/RestauranteCard';
import { restaurantes } from '@/data/restaurantes';

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Restaurantes</h1>
      {restaurantes.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum restaurante encontrado.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {restaurantes.map((restaurante) => (
            <RestauranteCard key={restaurante.id} restaurante={restaurante} />
          ))}
        </div>
      )}
    </main>
  );
}
