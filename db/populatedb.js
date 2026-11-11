import { Client } from "pg";

const SQL = `
  CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      category_name VARCHAR(100) NOT NULL
  );

  INSERT INTO categories (category_name)
  VALUES ('fruits'), ('vegetables'), ('meats'), ('seafood'), ('dairy'), ('grains'), ('bakery'), ('beverages');

  CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      product_name VARCHAR(100) NOT NULL,
      category_id INTEGER REFERENCES categories(id),
      price NUMERIC(10, 2) NOT NULL,
      quantity INTEGER NOT NULL,
      image BYTEA
  );
`;
// INSERT INTO products (product_name, price, category_id, quantity, image_url)
// VALUES ('banana', 5.5, 1, 10, NULL);

async function main() {
  const client = new Client({
    connectionString: process.env.LOCAL_DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}

main();
