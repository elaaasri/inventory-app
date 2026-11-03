import {
  fetchProducts,
  fetchCategories,
  addNewProduct,
  getProductsBySearch,
  getProductsByCategory,
  deleteProductById,
} from "../db/queries.js";

async function getProductsPage(req, res) {
  try {
    const products = await fetchProducts();
    const categories = await fetchCategories();

    res.render("products-page", { products, categories });
  } catch (err) {
    console.log(err);
  }
}

async function getFormPage(req, res) {
  const categories = await fetchCategories();
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
  const { category } = req.params;
  const products = await getProductsByCategory(category);
  const categories = await fetchCategories();
  res.render("products-page", { products, categories });
}
async function deleteProduct(req, res) {
  const { id } = req.params;
  await deleteProductById(id);
  res.sendStatus(200);
}

export {
  getProductsPage,
  getFormPage,
  createProductPost,
  showProductsByCategory,
  searchProducts,
  deleteProduct,
};
