import pool from "./pool.js";

async function fetchCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function fetchProducts() {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows;
}

export { fetchCategories, fetchProducts };
