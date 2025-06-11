'use client'

import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function Cart() {
  const {
    cart,
    restaurante,
    isCartOpen,
    toggleCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    frete
  } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
  const total = subtotal + frete;

  const handleCheckout = () => {
    if (cart.length === 0 || !restaurante) return;

    // Remove tudo que não for número do telefone
    const telefoneRestaurante = restaurante.telefone.replace(/\D/g, '');

    let message = `Olá ${restaurante.nome}, gostaria de fazer um pedido:\n\n`;

    cart.forEach(item => {
      message += `*${item.nome}* - ${item.quantidade}x R$ ${item.preco.toFixed(2)}\n`;
    });

    message += `\n*Subtotal:* R$ ${subtotal.toFixed(2)}`;
    message += `\n*Frete:* R$ ${frete.toFixed(2)}`;
    message += `\n*Total:* R$ ${total.toFixed(2)}`;
    message += `\n\n*Meus dados:*\nNome: [SEU_NOME]\nEndereço: [SEU_ENDERECO]\nPagamento: [FORMA_DE_PAGAMENTO]`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${telefoneRestaurante}?text=${encodedMessage}`, '_blank');

    alert('Seu pedido foi enviado para o WhatsApp!');
    clearCart();
    toggleCart();
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-white bg-opacity-50 z-50 flex justify-center">
      <div className="bg-white w-full max-w-sm sm:max-w-md md:max-w-md lg:max-w-lg h-full overflow-y-auto shadow-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Carrinho</h2>
          <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700 text-2xl">
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
            <button
              onClick={toggleCart}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Ver restaurantes
            </button>
          </div>
        ) : (
          <>
            <div className="p-4">
              {restaurante && (
                <div className="mb-4 p-2 bg-gray-100 rounded-lg">
                  <p className="font-bold">{restaurante.nome}</p>
                </div>
              )}
              {cart.map(item => (
                <div key={item.id} className="flex items-center py-4 border-b">
                  <div className="relative w-16 h-16 mr-4">
                    <Image
                      src={item.foto}
                      alt={item.nome}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{item.nome}</h3>
                    <p className="text-gray-600 text-sm">R$ {item.preco.toFixed(2)}</p>

                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantidade - 1))}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="mx-2 w-8 text-center">{item.quantidade}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        Remover
                      </button>
                    </div>
                  </div>

                  <p className="font-bold ml-2">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Frete</span>
                <span>R$ {frete.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-lg border-t border-b">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold"
              >
                Finalizar Pedido via WhatsApp
              </button>

              <button
                onClick={clearCart}
                className="w-full mt-2 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
              >
                Limpar Carrinho
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
