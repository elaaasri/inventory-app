import express from "express";
import { inventoryRouter } from "./routes/inventoryRouter.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", inventoryRouter);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on port: ${PORT}`);
});

// console.log(process.env.DB_URL);
// console.log(process.env.LOCAL_DB_URL);

// setting local db ==> done
// how to check the db connection
// switching up between local and remote dbs

// all categories needed
// create second table products
