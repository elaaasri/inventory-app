import pool from "./pool.js";

async function fetchCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function fetchProducts() {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows;
}

async function getCategoryIdByName(categoryName) {
  const { rows } = await pool.query(
    "SELECT id FROM categories WHERE name = $1",
    [categoryName],
  );
  return rows[0].id;
}
async function addNewProduct(
  productName,
  categoryId,
  productPrice,
  productQuantity,
) {
  await pool.query(
    "INSERT INTO products (name, category_id, price, quantity) VALUES ($1, $2, $3, $4)",
    [productName, categoryId, productPrice, productQuantity],
  );
}

export { fetchCategories, fetchProducts, getCategoryIdByName, addNewProduct };
