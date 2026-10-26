import { Router } from "express";
import { renderIndex } from "../controllers/indexController.js";
import { getCategoriesPage } from "../controllers/categoriesContoller.js";
import { getProductsPage } from "../controllers/productsContoller.js";

const inventoryRouter = Router();
inventoryRouter.get("/", renderIndex);
inventoryRouter.get("/categories", getCategoriesPage);
inventoryRouter.get("/products", getProductsPage);

export { inventoryRouter };
