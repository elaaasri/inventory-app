import { body, query, param } from "express-validator";

const requiredField = (fieldName, errorMessage) => {
  return body(fieldName).trim().notEmpty().withMessage(errorMessage);
};

const validateProductSearch = [query("searchValue").trim().escape()];

const validateAdminPassword = [
  requiredField("passwordInput", "Required Password!"),
];

const validateId = [
  param("id").isInt({ min: 1 }).withMessage("Invalid product ID!").escape(),
];

const validateProductEdit = [
  ...validateAdminPassword,

  requiredField("prodPrice", "Required Product Price!")
    .isFloat({ min: 0 })
    .withMessage("Invalid Product Price!")
    .escape(),

  requiredField("prodQuantity", "Required Product Quantity!")
    .isInt({ min: 1 })
    .withMessage("Invalid Product Quantity!")
    .escape(),

  requiredField("categoryId", "Required Product Category!").escape(),

  // param("id").isInt().withMessage("Invalid product ID!").escape(),
];

const validateProductForm = [
  requiredField("prodName", "Required Product Name!")
    .isAlpha()
    .withMessage("Invalid Product Name")
    .escape(),

  requiredField("prodPrice", "Required Product Price!")
    .isFloat({ min: 0 })
    .withMessage("Invalid Product Price!")
    .escape(),

  requiredField("prodQuantity", "Required Product Quantity!")
    .isInt({ min: 1 })
    .withMessage("Invalid Product Quantity!")
    .escape(),

  requiredField("categoryId", "Required Product Category!").escape(),

  body("prodImage").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Required Product Image!");
    }

    return true;
  }),
];

export {
  validateProductForm,
  validateProductSearch,
  validateProductEdit,
  validateAdminPassword,
  validateId,
};
