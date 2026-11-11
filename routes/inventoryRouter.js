import { Router } from "express";
import multer from "multer";
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
  getEditpage,
  updateProduct,
} from "../controllers/productsContoller.js";

const upload = multer({
  storage: multer.memoryStorage(),
});
const inventoryRouter = Router();

inventoryRouter.get("/", renderIndex);
inventoryRouter.get("/categories", getCategoriesPage);
inventoryRouter.get("/products", getProductsPage);
inventoryRouter.get("/products/create", getFormPage);
inventoryRouter.post(
  "/products/create",
  upload.single("prodImage"),
  createProductPost,
);
inventoryRouter.get("/products/search", searchProducts);
inventoryRouter.get("/products/category", showProductsByCategory);
inventoryRouter.delete("/products/:id/delete", deleteProduct);
inventoryRouter.get("/products/:id/edit", getEditpage);
inventoryRouter.post("/products/:id/update", updateProduct);
inventoryRouter.get("/products/:id", getProductPage);

export { inventoryRouter };

// filters products feature done
// search bar feature done
// delete product done
// add product page! done
// edit product done
// add image to db
// handle db errors
// fix db types!
// sanitaion
// not found pages
// delete/edit access to admin only!
// style css
