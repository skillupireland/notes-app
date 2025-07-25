const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to database...');
    const conn = await mongoose.connect(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DATABASE_NAME ?? 'My_Database'
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;