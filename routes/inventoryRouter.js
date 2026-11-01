import { Router } from "express";
import { renderIndex } from "../controllers/indexController.js";
import { getCategoriesPage } from "../controllers/categoriesContoller.js";
import {
  getProductsPage,
  getFormPage,
  createProductPost,
  showProductsByCategory,
} from "../controllers/productsContoller.js";

const inventoryRouter = Router();
inventoryRouter.get("/", renderIndex);
inventoryRouter.get("/categories", getCategoriesPage);
inventoryRouter.get("/products", getProductsPage);
inventoryRouter.get("/products/create", getFormPage);
inventoryRouter.post("/products/create", createProductPost);
inventoryRouter.get("/categories/:category", showProductsByCategory);

export { inventoryRouter };
