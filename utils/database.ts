import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false // to track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('MongoDB is already connected!')
        return;
    }    

    try {
        mongoose.connect(process.env.MONGODB_URI || '', {
            dbName: 'db_prompts',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)

        isConnected = true 
        console.log('MongoDB connection successful!')
    } catch (error: any) {
        console.error('An error occured: ', error.message)
    }
}