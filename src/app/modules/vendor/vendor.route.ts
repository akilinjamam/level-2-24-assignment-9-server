import { validateRequest } from "../../../middleware/validateRequest";
import { vendorController } from "./vendor.controller";
import express from "express";
import { vendorSchema } from "./vendor.validation";

const router = express.Router();

router.post(
  "/create-vendor",
  validateRequest(vendorSchema.createvendorValidationSchema),
  vendorController.createVendorController
);

router.get("/", vendorController.getVendorController);
router.get("/get-with-id/:id", vendorController.getVendorWithController);

export const vendorRouter = router;
