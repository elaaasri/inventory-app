import { Router } from "express";
import { renderIndex } from "../controllers/indexController.js";
import { getCategoriesPage } from "../controllers/categoriesContoller.js";
import {
  getProductsPage,
  getProductPage,
  getFormPage,
  createProductPost,
  searchProducts,
  showProductsByCategory,
  deleteProduct,
} from "../controllers/productsContoller.js";

const inventoryRouter = Router();

inventoryRouter.get("/", renderIndex);
inventoryRouter.get("/categories", getCategoriesPage);
inventoryRouter.get("/products", getProductsPage);
inventoryRouter.get("/products/create", getFormPage);
inventoryRouter.post("/products/create", createProductPost);
inventoryRouter.get("/products/search", searchProducts);
inventoryRouter.get("/products/category", showProductsByCategory);
inventoryRouter.get("/products/:id", getProductPage);
inventoryRouter.delete("/products/:id", deleteProduct);

export { inventoryRouter };

// filters products feature done
// search bar feature done
// delete product
// edit product
// add image and product page!
// handle db errors
// sanitaion
// not found page
// fix form types!
// delete/edit access to admin only!
// style;
