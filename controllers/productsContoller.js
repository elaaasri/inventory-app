import {
  fetchProducts,
  fetchCategories,
  addNewProduct,
  getProductsByCategory,
} from "../db/queries.js";

async function getProductsPage(req, res) {
  try {
    const products = await fetchProducts();
    res.render("products-page", { products });
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

async function showProductsByCategory(req, res) {
  const { category } = req.params;
  const products = await getProductsByCategory(category);
  res.render("products-page", { products });
}

export {
  getProductsPage,
  getFormPage,
  createProductPost,
  showProductsByCategory,
};
