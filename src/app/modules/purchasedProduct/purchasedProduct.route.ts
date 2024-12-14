import express from "express";
import { validateRequest } from "../../../middleware/validateRequest";
import { purchasedProductSchema } from "./purchasedProduct.validation";
import { purchasedProductController } from "./purchasedProduct.controller";

const router = express.Router();

router.post("/create-payment", purchasedProductController.createPayment);
router.post("/success-payment", purchasedProductController.successPayment);

router.post(
  "/add-to-cart",
  validateRequest(purchasedProductSchema.createPurchasedProductSchema),
  purchasedProductController.addToCart
);

export const purchasedProductRouter = router;
