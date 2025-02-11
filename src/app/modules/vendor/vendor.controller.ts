import { DecodedToken } from "../../../auth/auth";
import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { TImageFiles } from "../products/products.constant";
import { vendorService } from "./vendor.service";

const createVendorController = tryCatchAsync(async (req, res) => {
  const { userType, userId } = req.user as DecodedToken;

  if (userType !== "VENDOR") {
    throw new Error("only vendor can create product");
  }

  const images = req?.files as TImageFiles;
  const image = images?.images[0]?.path;

  const result = await vendorService.createVendor(
    req.body,
    image as unknown as string,
    userId
  );

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

const getVendorWithUserIdController = tryCatchAsync(async (req, res) => {
  const result = await vendorService.getAllVendorWithUserId(req.params.id);

  res.status(201).json({
    success: true,
    status: 201,
    message: "Vendor id found with user-id successfully",
    data: result,
  });
});
const updateVendorController = tryCatchAsync(async (req, res) => {
  const result = await vendorService.updateVendor(req.params.id, req.body);

  res.status(201).json({
    success: true,
    status: 201,
    message: "Vendor updated successfully",
    data: result,
  });
});

const updateVendorImgController = tryCatchAsync(async (req, res) => {
  const { userType } = req.user as DecodedToken;

  if (userType !== "VENDOR") {
    throw new Error("only vendor can create product");
  }
  const images = req?.files as TImageFiles;
  const image = images?.images[0]?.path;

  const newUpdatedData = {
    logo: image,
  };

  const result = await vendorService.updateVendorImg(
    req.params.id,
    newUpdatedData
  );

  res.status(201).json({
    success: true,
    status: 201,
    message: "Vendor image updated successfully",
    data: result,
  });
});

export const vendorController = {
  createVendorController,
  getVendorController,
  getVendorWithController,
  getVendorWithUserIdController,
  updateVendorController,
  updateVendorImgController,
};
