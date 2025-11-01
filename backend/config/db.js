import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // You can add options, but mongoose 7+ uses good defaults now
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    // Stop the server if DB connection fails
    process.exit(1);
  }
};

export default connectDB;
