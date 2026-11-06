import pool from "./pool.js";

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getProducts() {
  const { rows } = await pool.query(`
    SELECT products.id, product_name, price, quantity, category_name 
    FROM products 
    JOIN categories 
    ON products.category_id = categories.id`);

  return rows;
}

async function getProductById(id) {
  const { rows } = await pool.query(
    `
    SELECT products.id, product_name, price, quantity, category_name 
    FROM products   
    JOIN categories 
    ON products.category_id = categories.id
    WHERE products.id = $1`,
    [id],
  );

  return rows;
}

async function addNewProduct(productData) {
  const { prodName, categoryId, prodPrice, prodQuantity } = productData;

  await pool.query(
    "INSERT INTO products (product_name, category_id, price, quantity) VALUES ($1, $2, $3, $4)",
    [prodName, categoryId, prodPrice, prodQuantity],
  );
}

async function getProductsBySearch(searchValue) {
  const { rows } = await pool.query(
    `
    SELECT products.id, product_name, price, quantity, category_name 
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
    SELECT products.id, product_name, price, quantity, category_name 
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

async function updateProductById(productData, id) {
  const { prodName, categoryId, prodPrice, prodQuantity } = productData;
  // adding categoryid and category_name later
  const { rows } = await pool.query(
    `
    UPDATE products
    SET product_name = $1,
        price = $2,
        quantity = $3
    WHERE id = $4
    RETURNING *
    `,
    [prodName, prodPrice, prodQuantity, id],
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
