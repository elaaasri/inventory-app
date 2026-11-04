import {
  getProducts,
  getProductById,
  getCategories,
  addNewProduct,
  getProductsBySearch,
  getProductsByCategory,
  deleteProductById,
} from "../db/queries.js";

async function getProductsPage(req, res) {
  try {
    const products = await getProducts();
    const categories = await getCategories();

    res.render("products-page", { products, categories });
  } catch (err) {
    console.log(err);
  }
}

async function getProductPage(req, res) {
  const { id } = req.params;
  const [product] = await getProductById(id);
  console.log(product);
  res.render("product-page", { product });
}

async function getFormPage(req, res) {
  const categories = await getCategories();
  res.render("form", { categories });
}

async function createProductPost(req, res) {
  await addNewProduct(req.body);
  res.redirect("/products");
}

async function searchProducts(req, res) {
  const { searchValue } = req.query;
  const products = await getProductsBySearch(searchValue);
  res.render("search-page", { products });
}

async function showProductsByCategory(req, res) {
  const { category } = req.query;
  const products = await getProductsByCategory(category);
  const categories = await getCategories();
  res.render("products-page", { products, categories });
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  await deleteProductById(id);
  res.sendStatus(200);
}

export {
  getProductsPage,
  getProductPage,
  getFormPage,
  createProductPost,
  showProductsByCategory,
  searchProducts,
  deleteProduct,
};
