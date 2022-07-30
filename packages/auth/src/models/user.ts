import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'

interface UserAttributes {
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  verifyPassword(password: string): boolean;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    versionKey: false,
    transform (doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.password
    }
  }
})

userSchema.plugin(bcrypt)

export const UserModel = mongoose.model('User', userSchema)
export default class User extends UserModel {
  constructor(attributes: UserAttributes) {
    super(attributes)
  }
}
