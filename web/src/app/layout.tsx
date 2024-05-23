'use client'

import './globals.css'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedIn = Cookies.get('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
  }, [isLoggedIn])

  const handleLogout = () => {
    Cookies.remove('isLoggedIn')
    setIsLoggedIn(false)
  }

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between bg-white p-4 shadow">
          <Link href="/">
            <h1 className="text-2xl font-bold hover:text-zinc-600">EDX Test</h1>
          </Link>
          <input
            type="text"
            placeholder="Procurar..."
            className="rounded border p-2"
          />
          <div className="flex items-center">
            <Link href="cart">
              <ShoppingCart className="mr-4 text-blue-600 hover:text-blue-400" />
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="h-8 w-16 rounded-full bg-red-500 text-white hover:bg-red-400"
              >
                Logout
              </button>
            ) : (
              <Link
                href="login"
                onClick={() =>
                  localStorage.setItem('previousPath', window.location.pathname)
                }
              >
                <button className="h-8 w-16 rounded-full bg-gray-300 hover:bg-gray-200">
                  Login
                </button>
              </Link>
            )}
          </div>
        </header>
        <main className="flex-grow p-8">{children}</main>
        <footer className="bg-white p-4 text-center text-xs shadow">
          Created by Guilherme Paluri
        </footer>
      </body>
    </html>
  )
}
