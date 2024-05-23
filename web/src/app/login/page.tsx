'use client'

import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await api.post('login', { email, password })
      const redirectUrl = localStorage.getItem('previousPath') || '/'
      router.push(redirectUrl)
      Cookies.set('isLoggedIn', 'true')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(JSON.parse(err.request.response).message)
    }
  }

  return (
    <main className="flex flex-grow items-center justify-center">
      <div className="rounded border p-8 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="login" className="mb-1 block">
              Email
            </label>
            <input
              type="text"
              id="login"
              className="w-full rounded border p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="mb-1 block">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded border p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  )
}
