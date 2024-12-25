import express from "express";
import { validateRequest } from "../../../middleware/validateRequest";
import { purchasedProductSchema } from "./purchasedProduct.validation";
import { purchasedProductController } from "./purchasedProduct.controller";
import auth from "../../../auth/auth";

const router = express.Router();

router.post("/create-payment", purchasedProductController.createPayment);
router.post("/success-payment", purchasedProductController.successPayment);

router.post(
  "/add-to-cart",
  validateRequest(purchasedProductSchema.createPurchasedProductSchema),
  purchasedProductController.addToCart
);
router.post(
  "/replace-cart",
  validateRequest(purchasedProductSchema.createAddToCartProductSchema),
  purchasedProductController.replaceCart
);
router.get("/get-cart-by-id/:id", purchasedProductController.getCartWithUserId);
router.get(
  "/get-purchased-history",
  auth(),
  purchasedProductController.getPurchasedHistory
);
router.delete(
  "/delete-cart-by-id/:id",
  purchasedProductController.deleteCartWithId
);

export const purchasedProductRouter = router;
