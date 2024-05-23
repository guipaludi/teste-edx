import { randomUUID } from 'node:crypto'
import mongoose, { Document, Schema } from 'mongoose'

interface HistoryInterface extends Document {
  _id: string
  product: string
  price: number
  username: string
  email: string
}

const historySchema: Schema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  product: { type: String, required: true },
  price: { type: Number, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
})

const History = mongoose.model<HistoryInterface>('History', historySchema)

export default History
