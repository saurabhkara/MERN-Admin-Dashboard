import dotenv from "dotenv";

dotenv.config();

export const { MONGO_URL, PORT_NUMBER } = process.env;
