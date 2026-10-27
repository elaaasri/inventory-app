import { fetchCategories } from "../db/queries.js";

async function getCategoriesPage(req, res) {
  try {
    const categories = await fetchCategories();
    res.render("categories-page", { categories });
    // console.log("categories", categories);
  } catch (err) {
    console.log(err);
  }
}

export { getCategoriesPage };
