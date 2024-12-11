import express from "express";
import { validateRequest } from "../../../middleware/validateRequest";
import { productSchema } from "./product.validation";
import { productController } from "./products.controller";

const router = express.Router();

router.post(
  "/create-product",
  validateRequest(productSchema.createProductSchema),
  productController.createProduct
);

export const productRouter = router;