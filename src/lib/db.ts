import knex from "knex";
import { env } from "@/env";
export const db = knex({
  client: "mysql2",
  connection: {
    host: env.DB_HOST,
    // @ts-ignore
    port: env.DB_PORT.toString(),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
  },
});
