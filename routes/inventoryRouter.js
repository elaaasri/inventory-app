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
  notFoundPage,
} from "../controllers/productsContoller.js";

const inventoryRouter = Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

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
inventoryRouter.use(notFoundPage);
inventoryRouter.use((err, req, res, next) => {
  res.status(500).render("500");
});

export { inventoryRouter };

// filters products feature done
// search bar feature done
// delete product done
// add product page! done
// edit product done
// add image to db done
// fix db types! done
// 404 not found pages done
// 500 page
// 400 page
// custom error class
// fix helper to handle both array and a obj
// fix routes that wont show not found page correctly!
// handle db errors
// validation and sanitization
// delete/edit access to admin only!
// style css
