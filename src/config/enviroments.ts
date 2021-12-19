import { config } from 'dotenv';
config({ path: `.env.${process.env.ENVIRONMENT}` });
const { env } = process;

export const environments = {
  PORT: Number(env.PORT || 3000),
  APP_DOMAIN: env.APP_DOMAIN,
  MONGO_URI: env.MONGO_URI,
  MAIL_HOST: env.MAIL_HOST,
  MAIL_USER: env.MAIL_USER,
  MAIL_PASSWORD: env.MAIL_PASSWORD,
  MAIL_FROM: env.MAIL_FROM,
  GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: env.GOOGLE_SECRET,
  JWT_SECRET: env.JWT_SECRET,
};
