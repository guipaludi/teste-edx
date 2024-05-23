'use client'

import { CartProvider, useCart } from '@/components/CartContext'
import { ProductCard } from '@/components/ProductCard'
import { api } from '@/lib/api'
import { UUID } from 'crypto'
import { useEffect, useState } from 'react'
interface Product {
  _id: UUID
  title: string
  description: string
  price: number
  quantity: number
  image: string
}

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    api
      .get('products')
      .then((res) => {
        setProducts(res.data)
      })
      .catch((error) => {
        console.error('Erro ao obter produtos', error)
      })
  }, [])

  return (
    <CartProvider>
      <main className="flex-grow p-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => {
            return (
              <ProductCard
                key={index}
                title={product.title}
                description={product.description}
                price={Number(product.price).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
                image={product.image}
                addToCart={() => addToCart(product)}
              />
            )
          })}
        </div>
      </main>
    </CartProvider>
  )
}

export default function HomeWithCartProvider() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  )
}
