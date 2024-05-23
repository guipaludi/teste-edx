import fastify from 'fastify'
import cors from '@fastify/cors'
import mongoose from 'mongoose'
import { productRoutes } from '../routes/productRoutes'
import { userRoutes } from '../routes/userRoutes'
import { historyRoutes } from '../routes/historyRoutes'

const connectToDB = async () => {
  try {
    await mongoose.connect(
      'mongodb://admin:admin@localhost:27017/db?authSource=admin',
    )
    console.log(
      'Conexão com o banco de dados MongoDB estabelecida com sucesso.',
    )
  } catch (error) {
    console.log(error)
  }
}

connectToDB()

const app = fastify()

app.register(cors)
app.register(productRoutes)
app.register(userRoutes)
app.register(historyRoutes)

app.get('/', () => {
  return 'Hello EDX'
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running...')
})
