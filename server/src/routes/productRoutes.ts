import { FastifyInstance } from 'fastify'
import Product from '../database/models/productModel'
import { z } from 'zod'

export async function productRoutes(app: FastifyInstance) {
  app.post('/products', async (req, res) => {
    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      price: z.number(),
      quantity: z.number(),
      image: z.string(),
    })

    try {
      const { title, description, price, quantity, image } = bodySchema.parse(
        req.body,
      )
      const newProduct = new Product({
        title,
        description,
        price,
        quantity,
        image,
      })
      await newProduct.save()

      res.status(201).send(newProduct)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.get('/products', async (req, res) => {
    try {
      const products = await Product.find()
      res.send(products)
    } catch (error) {
      res.status(500).send({ message: 'Erro ao buscar os produtos', error })
    }
  })

  app.get('/products/:id', async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    try {
      const productId = id
      const product = await Product.findById(productId)
      if (!product) {
        return res.status(404).send({ message: 'Produto não encontrado' })
      }
      res.send(product)
    } catch (error) {
      res.status(500).send({ message: 'Erro ao buscar o produto', error })
    }
  })

  app.put('/products/:id', async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      price: z.number(),
      quantity: z.number(),
    })

    const { title, description, price, quantity } = bodySchema.parse(req.body)

    try {
      const productId = id
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { title, description, price, quantity },
        { new: true },
      )
      if (!updatedProduct) {
        return res.status(404).send({ message: 'Produto não encontrado' })
      }
      res.send(updatedProduct)
    } catch (error) {
      res.status(500).send({ message: 'Erro ao atualizar o produto', error })
    }
  })

  app.delete('/products/:id', async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    try {
      const productId = id
      const deletedProduct = await Product.findByIdAndDelete(productId)
      if (!deletedProduct) {
        return res.status(404).send({ message: 'Produto não encontrado' })
      }
      res.send({ message: 'Produto deletado com sucesso' })
    } catch (error) {
      res.status(500).send({ message: 'Erro ao deletar o produto', error })
    }
  })
}
