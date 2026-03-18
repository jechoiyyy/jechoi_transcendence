import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_ACCESS_SECRET || "mySecretKey123";
