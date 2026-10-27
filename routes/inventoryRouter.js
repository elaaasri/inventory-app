import { Router } from "express";
import { renderIndex } from "../controllers/indexController.js";
import { getCategoriesPage } from "../controllers/categoriesContoller.js";
import { getProductsPage } from "../controllers/productsContoller.js";
import { getCategoryIdByName, addNewProduct } from "../db/queries.js";

const inventoryRouter = Router();
inventoryRouter.get("/", renderIndex);
inventoryRouter.get("/categories", getCategoriesPage);

// inventoryRouter.get("/categories/:name", (req, res) => {
//   console.log("zbe", req.params.name);
//   res.sendStatus(200);
// });

inventoryRouter.get("/products", getProductsPage);
inventoryRouter.get("/products/create", (req, res) => {
  res.render("form");
});
inventoryRouter.post("/products/create", async (req, res) => {
  const { productName, productPrice, productQuantity, categoryName } = req.body;
  const categoryId = await getCategoryIdByName(categoryName);
  await addNewProduct(productName, categoryId, productPrice, productQuantity);
  res.sendStatus(200);
});

// add category name to product page ejs!
// dynamic way to get id instead of using a query!
// clean code!

export { inventoryRouter };
