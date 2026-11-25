import { body, query } from "express-validator";

const requiredField = (fieldName, errorMessage) => {
  return body(fieldName).trim().notEmpty().withMessage(errorMessage);
};

const validateProductForm = [
  requiredField("prodName", "required product name!")
    .not()
    .isNumeric()
    .withMessage("product name cannot be numeric!")
    .escape(),

  requiredField("prodPrice", "required product price!")
    .isNumeric()
    .withMessage("product price must be numeric!")
    .escape(),

  requiredField("prodQuantity", "required product quantity!")
    .isNumeric()
    .withMessage("product quantity must be numeric!")
    .escape(),

  requiredField("categoryId", "required product category!").escape(),

  body("prodImage").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("required product image!");
    }

    return true;
  }),
];

const validateProductSearch = [query("searchValue").trim().escape()];

export { validateProductForm, validateProductSearch };
