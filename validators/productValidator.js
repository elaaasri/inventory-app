import { body } from "express-validator";

const requiredField = (fieldName, errorMessage) => {
  return body(fieldName).trim().notEmpty().withMessage(errorMessage);
};

const validateProductForm = [
  requiredField("prodName", "required product name!")
    .not()
    .isNumeric()
    .withMessage("product name cannot be numeric!"),

  requiredField("prodPrice", "required product price!")
    .isNumeric()
    .withMessage("product price must be numeric!"),

  requiredField("prodQuantity", "required product quantity!")
    .isNumeric()
    .withMessage("product quantity must be numeric!"),

  requiredField("categoryId", "required product category!"),

  requiredField("prodImage", "required product image!"),
];

export { validateProductForm };
