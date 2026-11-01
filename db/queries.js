import pool from "./pool.js";

async function fetchCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function fetchProducts() {
  const { rows } = await pool.query(`
    SELECT product_name, price, quantity, category_name 
    FROM products 
    JOIN categories 
    ON products.category_id = categories.id`);

  return rows;
}

async function addNewProduct(productData) {
  const { prodName, categoryId, prodPrice, prodQuantity } = productData;

  await pool.query(
    "INSERT INTO products (product_name, category_id, price, quantity) VALUES ($1, $2, $3, $4)",
    [prodName, categoryId, prodPrice, prodQuantity],
  );
}

async function getProductsByCategory(category) {
  const { rows } = await pool.query(
    `
    SELECT product_name, price, quantity, category_name 
    FROM products 
    JOIN categories 
    ON products.category_id = categories.id 
    AND category_name = $1`,
    [category],
  );

  return rows;
}

export { fetchCategories, fetchProducts, addNewProduct, getProductsByCategory };
