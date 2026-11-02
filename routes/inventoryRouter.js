import { Router } from "express";
import { renderIndex } from "../controllers/indexController.js";
import { getCategoriesPage } from "../controllers/categoriesContoller.js";
import {
  getProductsPage,
  getFormPage,
  createProductPost,
  searchProducts,
  showProductsByCategory,
} from "../controllers/productsContoller.js";

const inventoryRouter = Router();

inventoryRouter.get("/", renderIndex);
inventoryRouter.get("/categories", getCategoriesPage);
inventoryRouter.get("/products", getProductsPage);
inventoryRouter.get("/products/create", getFormPage);
inventoryRouter.post("/products/create", createProductPost);
inventoryRouter.get("/products/search", searchProducts);
inventoryRouter.get("/products/:category", showProductsByCategory);

export { inventoryRouter };

// filters products feature done
// search bar feature done
// edit product
// delete product
// handle db errors
// sanitaion
// style;
