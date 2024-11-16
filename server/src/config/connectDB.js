const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_CONNECTIONS_STRING)
        const connection = mongoose.connection
        console.log(`${connection.name} database connected`)
    } catch (error) {
        console.log("MongoDB connection failed")
        process.exit(1)
    }
}
module.exports = { connectDB }