import { fetchProducts, fetchCategories } from "../db/queries.js";
import { addNewProduct } from "../db/queries.js";

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

export { getProductsPage, getFormPage, createProductPost };
