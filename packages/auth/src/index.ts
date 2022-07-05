import mongoose from 'mongoose'
import app from './app'

const start = async () => {
  try {
    if (process.env.MONGO_URI) await mongoose.connect(process.env.MONGO_URI)
    else throw new Error('Auth: MONGO_URI is undefined')
    console.log('Auth database connected!')
  } catch (err) {
    console.error(err)
  }

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log('Auth service running on port:', port)
  })
}

start()
