import { validateRequest } from "../../../middleware/validateRequest";
import { vendorController } from "./vendor.controller";
import express, { NextFunction, Request, Response } from "express";
import { vendorSchema } from "./vendor.validation";
import auth from "../../../auth/auth";
import { upload } from "../../sendImgToCloudinary/sendImgToCloudinary";

const router = express.Router();

router.post(
  "/create-vendor",
  auth(),
  upload.fields([{ name: "images" }]),
  (req: Request, _response: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(vendorSchema.createvendorValidationSchema),
  vendorController.createVendorController
);

router.get("/", vendorController.getVendorController);
router.get("/get-with-id/:id", vendorController.getVendorWithController);

export const vendorRouter = router;
