import { config } from 'dotenv';
config();
const { env } = process;
const credentials =
  env.MONGO_USERNAME && env.MONGO_PASSWORD
    ? `${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@`
    : '';
const mongoUri =
  env.ENVIRONMENT === 'DEVELOPMENT'
    ? `mongodb://${credentials}${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DATABASE_NAME}`
    : env.MONGO_URI;

export const environments = {
  port: Number(env.PORT || 3000),
  mongoUri,
  MAIL_HOST: env.MAIL_HOST,
  MAIL_USER: env.MAIL_USER,
  MAIL_PASSWORD: env.MAIL_PASSWORD,
  MAIL_FROM: env.MAIL_FROM,
};
