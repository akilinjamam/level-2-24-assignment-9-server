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
router.post("/create-many", productController.createManyProduct);
router.get("/", productController.getProduct);
router.get(
  "/get-last-recents",
  productController.getLastTenRecentVisitedProducts
);
router.get("/get-with-category", productController.getProductWithCategory);
router.get("/get-with-flashSale", productController.getProductWithFlashSale);
router.get("/get-with-id/:id", productController.getProductWithId);
router.get("/get-with-vendor-id/:id", productController.getProductWithVendorId);
router.patch("/update-with-id/:id", productController.updateProduct);
router.delete("/delete-with-id/:id", productController.deleteProduct);
router.patch(
  "/img-update/:id",
  upload.fields([{ name: "images" }]),
  (req: Request, _response: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  productController.updateImgProduct
);

export const productRouter = router;
