import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-2">Página não encontrada</h1>
      <p className="text-lg text-gray-600 mb-6">
        O restaurante que você procura não existe ou foi removido.
      </p>
      <Link 
        href="/" 
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        aria-label="Voltar para a lista de restaurantes"
      >
        Voltar para restaurantes
      </Link>
    </div>
  );
}
