import { Client } from "pg";

const SQL = `
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR ( 255 )
    );

    INSERT INTO categories (name)
    VALUES ('fruites'), ('vegetables');
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}
main();
