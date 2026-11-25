import {
  getProducts,
  getProductById,
  getCategories,
  addNewProduct,
  getProductsBySearch,
  getProductsByCategory,
  deleteProductById,
  updateProductById,
} from "../db/queries.js";
import {
  convertProductsImages,
  convertProductImage,
} from "../utils/imageUtils.js";
import { AppError } from "../errors/AppError.js";
import { matchedData, validationResult } from "express-validator";

const getProductsPage = async (req, res) => {
  const products = await getProducts();
  const categories = await getCategories();
  const updatedProducts = convertProductsImages(products);

  res.render("products-page", { products: updatedProducts, categories });
};

const getProductPage = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);

  if (!product) {
    throw new AppError("Product Not Found!", 404);
  }

  const updatedProduct = convertProductImage(product);
  res.render("product-page", { product: updatedProduct });
};

const getFormPage = async (req, res) => {
  const categories = await getCategories();
  res.render("form", { categories, errors: {} });
};

const createProductPost = async (req, res) => {
  const categories = await getCategories();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      categories,
      errors: errors.mapped(),
    });
  }

  await addNewProduct(req.body, req.file.buffer);

  res.redirect("/products");
};

const searchProducts = async (req, res) => {
  const { searchValue } = matchedData(req);
  const products = await getProductsBySearch(searchValue);
  const updatedProducts = convertProductsImages(products);

  res.render("search-page", { products: updatedProducts });
};

const showProductsByCategory = async (req, res) => {
  const { category } = req.query;
  const categories = await getCategories();
  const products = await getProductsByCategory(category);
  const updatedProducts = convertProductsImages(products);

  res.render("products-page", { products: updatedProducts, categories });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProductCount = await deleteProductById(id);

  if (deletedProductCount == 0) {
    throw new AppError("Product Not Found!", 404);
  }

  res.redirect("/products");
};

const getEditpage = async (req, res) => {
  const { id } = req.params;

  const categories = await getCategories();
  const product = await getProductById(id);

  if (!product) {
    throw new AppError("Product Found Page!", 404);
  }

  const updatedProduct = convertProductImage(product);

  res.render("edit-page", { product: updatedProduct, categories });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await updateProductById(req.body, id);

  if (!product) {
    throw new AppError("Product Not Found!", 404);
  }

  const updatedProduct = convertProductImage(product);
  res.render("product-page", { product: updatedProduct });
};

const verifyAdminPassword = async (req, res, next) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const { passwordInput } = req.body;

  if (adminPassword != passwordInput) {
    throw new AppError("Invalid Password!", 401);
  }

  next();
};

const notFoundPage = (req, res) => {
  res.status(404).render("404");
};

export {
  getProductsPage,
  getProductPage,
  getFormPage,
  createProductPost,
  showProductsByCategory,
  searchProducts,
  deleteProduct,
  getEditpage,
  updateProduct,
  verifyAdminPassword,
  notFoundPage,
};
