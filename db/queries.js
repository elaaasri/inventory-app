import pool from "./pool.js";

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");

  return rows;
}

async function getProducts() {
  const { rows } = await pool.query(`
    SELECT products.id, product_name, price, quantity, image, category_name
    FROM products 
    JOIN categories 
    ON products.category_id = categories.id`);

  return rows;
}

async function getProductById(id) {
  const { rows } = await pool.query(
    `
    SELECT products.id, product_name, price, quantity, image, category_name 
    FROM products   
    JOIN categories
    ON products.category_id = categories.id
    WHERE products.id = $1`,
    [id],
  );

  return rows;
}

async function addNewProduct(productData, image) {
  const { prodName, categoryId, prodPrice, prodQuantity } = productData;

  await pool.query(
    "INSERT INTO products (product_name, category_id, price, quantity, image) VALUES ($1, $2, $3, $4, $5)",
    [prodName, categoryId, prodPrice, prodQuantity, image],
  );
}

async function getProductsBySearch(searchValue) {
  const { rows } = await pool.query(
    `
    SELECT products.id, product_name, price, quantity, image, category_name 
    FROM products 
    JOIN categories
    ON products.category_id = categories.id 
    AND product_name = $1`,
    [searchValue],
  );

  return rows;
}

async function getProductsByCategory(category) {
  const { rows } = await pool.query(
    `
    SELECT products.id, product_name, price, quantity, image, category_name 
    FROM products 
    JOIN categories 
    ON products.category_id = categories.id 
    AND category_name = $1`,
    [category],
  );

  return rows;
}

async function deleteProductById(id) {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
}

// here
async function updateProductById(productData, id) {
  const { prodName, categoryId, prodPrice, prodQuantity } = productData;

  const { rows } = await pool.query(
    `
    WITH p AS (
      UPDATE products
      SET product_name = $1,
          category_id = $2,
          price = $3,
          quantity = $4
      WHERE id = $5
      RETURNING *
      )
      SELECT p.id, p.product_name, p.price, p.quantity, category_name 
      FROM p 
      JOIN categories 
      ON p.category_id= categories.id
    `,
    [prodName, categoryId, prodPrice, prodQuantity, id],
  );

  return rows;
}

export {
  getCategories,
  getProducts,
  getProductById,
  addNewProduct,
  getProductsBySearch,
  getProductsByCategory,
  deleteProductById,
  updateProductById,
};
