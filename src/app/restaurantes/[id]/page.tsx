import Menu from '@/components/FoodCard';
import { restaurantes } from '@/data/restaurantes';

interface RestaurantePageProps {
  params: { id: string }
}

export default function RestaurantePage({ params }: RestaurantePageProps) {
  const restaurante = restaurantes.find(r => r.id === params.id);
  if (!restaurante) return <p>Restaurante não encontrado</p>;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 sticky top-0 z-10">
        <h1 className="text-3xl font-bold">{restaurante.nome}</h1>
        <p className="text-sm text-gray-600">Telefone: {restaurante.telefone}</p>
      </header>
      <Menu menu={restaurante.menu} restaurante={restaurante} />
    </main>
  );
}
