'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import QRCode from '../../../public/images/QRCode.png'
import { api } from '@/lib/api'
import { CartProvider, useCart } from '@/components/CartContext'
import { useRouter } from 'next/navigation'

function Checkout() {
  const { cart } = useCart()
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState('cartao')

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
  }

  const renderContent = () => {
    if (selectedOption === 'cartao') {
      return (
        <form className="flex flex-row items-center">
          <div className="mb-4 mr-8 p-2">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              CPF:
            </label>
            <input
              className="mb-4 w-full rounded border p-2 text-xs"
              id="cpf"
              type="text"
              placeholder="Digite seu CPF"
            />
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Número do cartão:
            </label>
            <input
              className="mb-4 w-full rounded border p-2 text-xs"
              id="numeroDoCartaoo"
              type="text"
              placeholder="Digite o número do cartão"
            />
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Validade:
            </label>
            <input
              className="w-full rounded border p-2 text-xs"
              id="validade"
              type="text"
              placeholder="MM/AA"
            />
          </div>
          <div className="mb-14 mr-8">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Nome:
            </label>
            <input
              className="mb-4 w-full rounded border p-2 text-xs"
              id="nome"
              type="text"
              placeholder="Digite seu nome completo"
            />
            <label className="mb-2 block text-sm font-bold text-gray-700">
              CVV:
            </label>
            <input
              className="mb-10 w-full rounded border p-2 text-xs"
              id="cvv"
              type="text"
              placeholder="cvv"
            />
          </div>
        </form>
      )
    } else if (selectedOption === 'pix') {
      return <Image src={QRCode} alt="QRCode" className="h-60 w-52" />
    } else if (selectedOption === 'boleto') {
      return (
        <button
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          onClick={handleDownload}
        >
          Baixar Boleto
        </button>
      )
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '../../../public/pdf/boleto.pdf'
    link.download = 'boleto.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      for (const productBought of cart) {
        await api.post('history', {
          product: productBought.title,
          price: productBought.price,
          username: 'batata',
          email: 'batata2',
        })
        await api.put(`products/${productBought._id}`, {
          title: productBought.title,
          description: productBought.description,
          price: productBought.price,
          quantity: productBought.quantity - 1,
        })
      }
      localStorage.removeItem('cart')
      window.alert('Compra realizada com sucesso!')
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className="flex flex-grow items-center justify-center">
      <div className="w-full max-w-4xl p-4">
        <div>
          <input
            type="radio"
            id="cartao"
            name="paymentOption"
            value="cartao"
            checked={selectedOption === 'cartao'}
            onChange={() => handleOptionChange('cartao')}
            className="mr-2"
          />
          <label className="text-gray-700" htmlFor="cartao">
            Cartão de Crédito
          </label>
          {selectedOption === 'cartao' && (
            <div className="rounded border p-8 shadow-lg">
              {renderContent()}
            </div>
          )}
        </div>
        <div className="mt-2">
          <input
            type="radio"
            id="pix"
            name="paymentOption"
            value="pix"
            checked={selectedOption === 'pix'}
            onChange={() => handleOptionChange('pix')}
            className="mr-2"
          />
          <label className="text-gray-700" htmlFor="pix">
            PIX
          </label>
          {selectedOption === 'pix' && (
            <div className="mt-2 border p-4">{renderContent()}</div>
          )}
        </div>
        <div className="mt-2">
          <input
            type="radio"
            id="boleto"
            name="paymentOption"
            value="boleto"
            checked={selectedOption === 'boleto'}
            onChange={() => handleOptionChange('boleto')}
            className="mr-2"
          />
          <label className="text-gray-700" htmlFor="boleto">
            Boleto
          </label>
          {selectedOption === 'boleto' && (
            <div className="mt-2 border p-4">{renderContent()}</div>
          )}
        </div>
        <button
          onClick={handlePayment}
          className="float-right rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
        >
          Pagar
        </button>
      </div>
    </main>
  )
}

export default function CheckoutWithCartContext() {
  return (
    <CartProvider>
      <Checkout />
    </CartProvider>
  )
}
