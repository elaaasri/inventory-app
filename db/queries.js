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
  const { productName, categoryId, productPrice, productQuantity } =
    productData;

  await pool.query(
    "INSERT INTO products (product_name, category_id, price, quantity) VALUES ($1, $2, $3, $4)",
    [productName, categoryId, productPrice, productQuantity],
  );
}

export { fetchCategories, fetchProducts, addNewProduct };

// async function getCategoryIdByName(categoryName) {
//   const { rows } = await pool.query(
//     "SELECT id FROM categories WHERE category_name = $1",
//     [categoryName],
//   );
//   return rows[0].id;
// }
