import mongoose, { Document, Schema } from 'mongoose'
import { randomUUID } from 'node:crypto'

interface UserInterface extends Document {
  _id: string
  username: string
  email: string
  password: string
  isAdmin: boolean
}

const userSchema: Schema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
})

const User = mongoose.model<UserInterface>('User', userSchema)

export default User
