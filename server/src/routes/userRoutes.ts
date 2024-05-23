import { FastifyInstance } from 'fastify'
import User from '../database/models/userModel'
import { z } from 'zod'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', async (req, res) => {
    const bodySchema = z.object({
      username: z.string(),
      email: z.string(),
      password: z.string(),
    })

    try {
      const { username, email, password } = bodySchema.parse(req.body)
      const newUser = new User({ username, email, password })
      await newUser.save()

      res.status(201).send(newUser)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/login', async (req, res) => {
    const bodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = bodySchema.parse(req.body)

    try {
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(401).send({ message: 'Email ou senha incorretos' })
      }

      if (password !== user.password) {
        return res.status(401).send({ message: 'Email ou senha incorretos' })
      }

      return res.status(200).send({ message: 'Login bem-sucedido', user })
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      return res.status(500).send({ message: 'Erro interno do servidor' })
    }
  })
}
