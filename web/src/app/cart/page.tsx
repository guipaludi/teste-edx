'use client'

import { CartProvider, useCart } from '@/components/CartContext'
import { CartProduct } from '@/components/CartProduct'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Link from 'next/link'

function Cart() {
  const { cart } = useCart()
  const router = useRouter()

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()

    const loggedIn = Cookies.get('isLoggedIn') === 'true'
    if (loggedIn) {
      router.push('/checkout')
    } else {
      localStorage.setItem('previousPath', window.location.pathname)
      router.push('/login')
    }
  }

  return (
    <main className="flex flex-grow items-center justify-center">
      <div className="w-full max-w-4xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Resumo da Sua Compra</h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">Nome do produto</th>
              <th className="border-b px-4 py-2">Descrição</th>
              <th className="border-b px-4 py-2">Valor</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <CartProduct
                key={index}
                title={product.title}
                description={product.description}
                price={product.price}
              />
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end">
          <span className="mr-4 font-bold">
            {cart
              .reduce((acc, product) => {
                return acc + product.price
              }, 0)
              .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
          </span>
        </div>
        <div className="mt-4 flex justify-end">
          <Link href={'/'}>
            <button className="mr-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-400">
              Voltar
            </button>
          </Link>
          <button
            onClick={handleCheckout}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
          >
            Finalizar a Compra
          </button>
        </div>
      </div>
    </main>
  )
}

export default function CartPage() {
  return (
    <CartProvider>
      <Cart />
    </CartProvider>
  )
}
