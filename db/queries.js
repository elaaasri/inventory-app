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

  return rows[0];
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

const deleteProductById = async (id) => {
  const { rowCount } = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id],
  );

  return rowCount;
};

async function updateProductById(productData, id) {
  const { prodPrice, prodQuantity = 5, categoryId = 1 } = productData;

  const { rows } = await pool.query(
    `
    WITH updated_product AS (
      UPDATE products
      SET
      price = $1,
      quantity = $2,
      category_id = $3
      WHERE id = $4
      RETURNING *
      )
      SELECT
      updated_product.id,
      updated_product.product_name,
      updated_product.price,
      updated_product.quantity,
      updated_product.image,
      category_name
      FROM updated_product
      JOIN categories 
        ON updated_product.category_id = categories.id
    `,
    [prodPrice, prodQuantity, categoryId, id],
  );

  return rows[0];
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
