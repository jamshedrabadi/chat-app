const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // eslint-disable-next-line no-console
        console.log(`MongoDB Connected: ${conn.connection.name} on ${conn.connection.port} (${conn.connection.host})`);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('MongoDB Connection Error:', error);
        throw error;
    }
};

module.exports = connectDB;
