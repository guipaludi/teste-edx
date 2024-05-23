import { FastifyInstance } from 'fastify'
import History from '../database/models/historyModel'
import { z } from 'zod'

export async function historyRoutes(app: FastifyInstance) {
  app.post('/history', async (req, res) => {
    const bodySchema = z.object({
      product: z.string(),
      price: z.number(),
      username: z.string(),
      email: z.string(),
    })

    try {
      const { product, price, username, email } = bodySchema.parse(req.body)
      const newHistory = new History({ product, price, username, email })
      await newHistory.save()

      res.status(201).send(newHistory)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.get('/history', async (req, res) => {
    try {
      const history = await History.find()
      res.send(history)
    } catch (error) {
      res.status(500).send({ message: 'Erro ao buscar o histórico', error })
    }
  })
}
