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
import { convertProductsImages } from "../utils/imageUtils.js";

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
  const updatedProduct = {
    ...product,
    image: `data:image/webp;base64,${product?.image?.toString("base64")}`,
  };
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

async function deleteProduct(req, res) {
  const { id } = req.params;
  await deleteProductById(id);
  res.sendStatus(200);
}

const getEditpage = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
      return res.status(400).send("Invalid ID");
    }

    const categories = await getCategories();
    const [product] = await getProductById(id);

    if (!product) {
      return res.status(404).render("404");
    }

    const updatedProduct = {
      ...product,
      image: `data:image/webp;base64,${product?.image?.toString("base64")}`,
    };

    res.render("edit-page", { product: updatedProduct, categories });
  } catch (err) {
    next(err);
  }
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
