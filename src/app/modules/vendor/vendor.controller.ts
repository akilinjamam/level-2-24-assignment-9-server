import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { vendorService } from "./vendor.service";

const createVendorController = tryCatchAsync(async (req, res) => {
  const result = await vendorService.createVendor(req.body);

  res.status(201).json({
    success: true,
    status: 201,
    message: "Vendor created successfully",
    data: result,
  });
});
const getVendorController = tryCatchAsync(async (req, res) => {
  const result = await vendorService.getAllVendor();

  res.status(201).json({
    success: true,
    status: 201,
    message: "Vendor found successfully",
    data: result,
  });
});
const getVendorWithController = tryCatchAsync(async (req, res) => {
  const result = await vendorService.getAllVendorWithId(req.params.id);

  res.status(201).json({
    success: true,
    status: 201,
    message: "Vendor id found successfully",
    data: result,
  });
});

export const vendorController = {
  createVendorController,
  getVendorController,
  getVendorWithController,
};
