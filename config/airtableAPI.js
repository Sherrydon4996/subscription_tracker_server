import Airtable from "airtable";
import { AIRTABLE_ACCESS_TOKEN, AIRTABLE_BASE_ID } from "./env.js";

export const base = new Airtable({ apiKey: AIRTABLE_ACCESS_TOKEN }).base(
  AIRTABLE_BASE_ID
);
