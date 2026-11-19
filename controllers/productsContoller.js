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

async function getProductsPage(req, res) {
  try {
    const products = await getProducts();
    const categories = await getCategories();
    const updatedProducts = convertProductsImages(products);

    res.render("products-page", { products: updatedProducts, categories });
  } catch (err) {
    console.log(err);
  }
}

async function getProductPage(req, res) {
  const { id } = req.params;
  const [product] = await getProductById(id);
  const updatedProduct = convertProductImage(product);

  res.render("product-page", { product: updatedProduct });
}

async function getFormPage(req, res) {
  const categories = await getCategories();
  res.render("form", { categories });
}

async function createProductPost(req, res) {
  const { body: productData, file } = req;

  await addNewProduct(productData, file.buffer);

  res.redirect("/products");
}

async function searchProducts(req, res) {
  const { searchValue } = req.query;
  const products = await getProductsBySearch(searchValue);
  const updatedProducts = convertProductsImages(products);
  res.render("search-page", { products: updatedProducts });
}

async function showProductsByCategory(req, res) {
  const { category } = req.query;
  const products = await getProductsByCategory(category);
  const updatedProducts = convertProductsImages(products);
  const categories = await getCategories();
  res.render("products-page", { products: updatedProducts, categories });
}

const deleteProduct = async (req, res, next) => {
  // throw new Error("azeaze");
  // throw new AppError("Product Not Found!", 400);
  try {
    const { id } = req.params;
    await deleteProductById(id);

    res.redirect("/products");
  } catch (err) {
    next(err);
  }
};

const getEditpage = async (req, res) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    throw new AppError("Invalid Id!", 400);
  }

  const categories = await getCategories();
  const [product] = await getProductById(id);

  if (!product) {
    throw new AppError("Not Found Page!", 404);
  }

  const updatedProduct = convertProductImage(product);

  res.render("edit-page", { product: updatedProduct, categories });
};

async function updateProduct(req, res) {
  const { id } = req.params;
  const [product] = await updateProductById(req.body, id);
  res.render("product-page", { product });
}

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
  notFoundPage,
};
