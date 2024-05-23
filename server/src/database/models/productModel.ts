import { randomUUID } from 'node:crypto'
import mongoose, { Document, Schema } from 'mongoose'

interface ProductInterface extends Document {
  _id: string
  title: string
  description: string
  price: number
  quantity: number
  image: string
}

const productSchema: Schema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
})

const Product = mongoose.model<ProductInterface>('Product', productSchema)

export default Product
