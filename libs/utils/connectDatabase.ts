import mongoose from 'mongoose'

const MONGODB_URI=process.env.MONGODB_URI as string


const connectToDatabase = async ()  => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(MONGODB_URI)
    console.log('mongodb connection is successful')
  } catch (error) {
    throw new Error("Error connecting to mongodb")
  }
}

export default connectToDatabase;