import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

jest.mock('../nats-client.ts')

let mongo: any
process.env.JWT_KEY = '!SuperSecretDevToken!'

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const uri = await mongo.getUri()
  await mongoose.connect(uri)
})

beforeEach(async () => {
  jest.clearAllMocks()
  const collections = await mongoose.connection.db.collections()
  for (const collection of collections) await collection.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.close()
  await mongo.stop()
})
