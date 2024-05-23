import { UUID } from 'crypto'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface Product {
  _id: UUID
  title: string
  description: string
  price: number
  quantity: number
  image: string
}

interface CartContextType {
  cart: Product[]
  addToCart: (product: Product) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const addToCart = (product: Product) => {
    const newCart = [...cart, product]
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    window.alert('Produto adicionado com sucesso')
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}
