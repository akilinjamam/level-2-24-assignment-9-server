import express, { NextFunction, Request, Response } from "express";
import { validateRequest } from "../../../middleware/validateRequest";
import { productSchema } from "./product.validation";
import { productController } from "./products.controller";
import { upload } from "../../sendImgToCloudinary/sendImgToCloudinary";
import auth from "../../../auth/auth";

const router = express.Router();

router.post(
  "/create-product",
  auth(),
  upload.fields([{ name: "images" }]),
  (req: Request, _response: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(productSchema.createProductSchema),
  productController.createProduct
);
router.get("/", productController.getProduct);
router.get("/get-with-category", productController.getProductWithCategory);
router.get("/get-with-flashSale", productController.getProductWithFlashSale);
router.get("/get-with-id/:id", productController.getProductWithId);
router.get("/update-with-id/:id", productController.updateProduct);

export const productRouter = router;
