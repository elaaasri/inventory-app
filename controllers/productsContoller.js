import { fetchProducts } from "../db/queries.js";

async function getProductsPage(req, res) {
  try {
    const products = await fetchProducts();
    res.render("products-page", { products });
    // console.log("products", products);
  } catch (err) {
    console.log(err);
  }
}

export { getProductsPage };
