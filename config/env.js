import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  AIRTABLE_ACCESS_TOKEN,
  AIRTABLE_BASE_ID,
  AIRTABLE_NAME,
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  MONGO_STRING,
  ARCJET_KEY,
  ARCJET_ENV,
  QSTASH_TOKEN,
  QSTASH_URL,
  SERVER_URL,
  ADMIN_EMAIL,
  BREVO_SENDER_NAME,
  BREVO_SENDER_EMAIL,
  BREVO_API_KEY,
} = process.env;
