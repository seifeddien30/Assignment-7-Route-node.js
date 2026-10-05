import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(".env") });

export const env = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URI,
};
