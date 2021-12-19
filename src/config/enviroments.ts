import { config } from 'dotenv';
config({ path: `.env.${process.env.ENVIRONMENT}` });
const { env } = process;

console.log(process.env.ENVIRONMENT);
export const environments = {
  port: Number(env.PORT || 3000),
  MONGO_URI: env.MONGO_URI,
  MAIL_HOST: env.MAIL_HOST,
  MAIL_USER: env.MAIL_USER,
  MAIL_PASSWORD: env.MAIL_PASSWORD,
  MAIL_FROM: env.MAIL_FROM,
};
