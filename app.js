import express from "express";
import router from "./routes/router.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use("", router);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on port: ${PORT}`);
});

console.log(process.env.DB_URL);

// how to check the db connection
// setting local db
// switching up between local and remote dbs

// all categories needed
// create second table products
