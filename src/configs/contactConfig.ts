import { config } from 'dotenv';

config();

export const serverPort = Number(process.env.PORT) || 3002;

export const mailer = {
  port: process.env.MAILER_PORT,
  host: process.env.MAILER_HOST,
  user: process.env.MAILER_USER,
  pass: process.env.MAILER_PASS,
};
