import { userTable } from "../models/users.model.js";
import { NODE_ENV } from "./env.js";

export async function airTableConnection() {
  try {
    const records = await userTable.select({ maxRecords: 5 }).firstPage();
    console.log(`Airtable database connected successfully in ${NODE_ENV} mode`);
    if (records.length > 0) console.log(`${records.length} records found`);
  } catch (error) {
    console.error(`error:${error}`);
  }
}

// app.get("/test", async (req, res) => {
//   try {
//     const records = await userTable.select({ maxRecords: 5 }).firstPage();
//     const data = records.map((r) => ({
//       id: r.id,
//       ...r.fields,
//     }));
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error connecting to AIrtable");
//   }
// });
