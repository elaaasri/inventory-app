import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on port: ${PORT}`);
});
