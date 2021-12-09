import { config } from 'dotenv';

config();

const env = process.env;

export const environments = {
  port: Number(env.PORT || 3000),
  mongoUri: env.MONGO_URI,
};
