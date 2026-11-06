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
  getEditpage,
  updateProduct,
} from "../controllers/productsContoller.js";

const inventoryRouter = Router();

inventoryRouter.get("/", renderIndex);
inventoryRouter.get("/categories", getCategoriesPage);
inventoryRouter.get("/products", getProductsPage);
inventoryRouter.get("/products/create", getFormPage);
inventoryRouter.post("/products/create", createProductPost);
inventoryRouter.get("/products/search", searchProducts);
inventoryRouter.get("/products/category", showProductsByCategory);
inventoryRouter.delete("/products/:id/delete", deleteProduct);
inventoryRouter.get("/products/:id/edit", getEditpage);
inventoryRouter.post("/products/:id/update", updateProduct);
inventoryRouter.get("/products/:id", getProductPage);

// here;
// change create to new done
// add delete to delete router done
// opt changing word update in last route done
// ask gpt about the edit feat! done
// add category_id and category_name to edit feat!

export { inventoryRouter };

// filters products feature done
// search bar feature done
// delete product done
// add product page! done
// edit product
// add image to db
// handle db errors
// sanitaion
// not found pages
// fix db types!
// delete/edit access to admin only!
// style css
