import { Client } from "pg";

const SQL = `
  CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(255) NOT NULL
  );

  INSERT INTO categories (name)
  VALUES ('fruites'), ('vegetables'), ('meat'), ('seafood'), ('dairy'), ('grains'), ('bakery'), ('beverages');

  CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(255) NOT NULL,
      category_id INTEGER REFERENCES categories(id),
      price NUMERIC(10, 2) NOT NULL,
      quantity INTEGER NOT NULL
  );

  INSERT INTO products (name, price, category, quantity)
  VALUES ('bread', 5.5, 1, 10);
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
