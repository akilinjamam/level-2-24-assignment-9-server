import { DecodedToken } from "../../../auth/auth";
import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { TImageFiles } from "./products.constant";
import { productService } from "./products.service";

const createProduct = tryCatchAsync(async (req, res) => {
  const { userType } = req.user as DecodedToken;

  if (userType !== "VENDOR") {
    throw new Error("only vendor can create product");
  }

  const images = req?.files as TImageFiles;
  const allImages = images?.images?.map((image) => image?.path);

  const result = await productService.createProductService(
    req.body,
    allImages as string[]
  );

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product created successfully",
    data: result,
  });
});
const createManyProduct = tryCatchAsync(async (req, res) => {
  const result = await productService.createMany(req.body);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Many Products created successfully",
    data: result,
  });
});

const getProduct = tryCatchAsync(async (req, res) => {
  const { category, from, to } = req.query;

  const result = await productService.getProductService(
    category as string,
    from as string,
    to as string
  );

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product retrieved successfully",
    total: result?.totalData,
    data: result?.result,
  });
});

const getProductWithCategory = tryCatchAsync(async (req, res) => {
  const { category, from, to } = req.query;

  const result = await productService.getProductWithCategory();

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product retrieved successfully",
    data: result,
  });
});

const getProductWithFlashSale = tryCatchAsync(async (req, res) => {
  const { category, from, to } = req.query;

  const result = await productService.getProductWithFlashSale();

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product retrieved flash sales successfully",
    data: result,
  });
});

const getProductWithId = tryCatchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await productService.getProductWithId(id);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product retrieved with id successfully",
    data: result,
  });
});
const getProductWithVendorId = tryCatchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await productService.getProductWithVendorId(id);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product retrieved with vendor id successfully",
    data: result,
  });
});

const updateProduct = tryCatchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await productService.updateProduct(id, req?.body);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product updated with id successfully",
    data: result,
  });
});
const updateImgProduct = tryCatchAsync(async (req, res) => {
  const { id } = req.params;

  const images = req?.files as TImageFiles;
  const image = images?.images[0]?.path;
  const { indexId } = req.body;

  const result = await productService.updateImageProduct(
    id,
    image as string,
    indexId
  );

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product image updated with id successfully",
    data: result,
  });
});

const deleteProduct = tryCatchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await productService.deleteProduct(id);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product deleted successfully",
    data: result,
  });
});

const getLastTenRecentVisitedProducts = tryCatchAsync(async (req, res) => {
  const result = await productService.getLastTenRecentVisitedProducts();

  res.status(200).json({
    success: true,
    status: 200,
    message: "recent product retrieved successfully",
    data: result,
  });
});

export const productController = {
  createProduct,
  getProduct,
  getProductWithCategory,
  getProductWithFlashSale,
  getProductWithId,
  getProductWithVendorId,
  updateProduct,
  updateImgProduct,
  deleteProduct,
  createManyProduct,
  getLastTenRecentVisitedProducts,
};
