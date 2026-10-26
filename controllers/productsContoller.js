import { fetchProducts } from "../db/queries.js";

async function getProductsPage(req, res) {
  try {
    const products = await fetchProducts();
    console.log(products);
    res.render("products-page", { products });
  } catch (err) {
    console.log(err);
  }
}

export { getProductsPage };
