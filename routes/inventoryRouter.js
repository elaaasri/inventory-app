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
  verifyAdminPassword,
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
inventoryRouter.delete(
  "/products/:id/delete",
  verifyAdminPassword,
  deleteProduct,
);
inventoryRouter.get("/products/:id/edit", getEditpage);
inventoryRouter.patch("/products/:id/update", updateProduct);
inventoryRouter.get("/products/:id", getProductPage);
inventoryRouter.use(notFoundPage);
inventoryRouter.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;

  res.status(statusCode).render("error", {
    message: statusCode === 500 ? "Internal Server Error!" : err.message,
    statusCode,
  });
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
// 500 page done
// 400 page done
// custom error class done
// fix helper to handle both array and a obj done
// fix routes that wont show not found page correctly! done
// handle all db errors done
// validation and sanitization
// style css
// supports mobile
// complete recap

// delete/edit access to admin only!
// add a input password if its correct let it
// otherewise dont let it
/**
 * button clicked
 *
 *
 *
 */
