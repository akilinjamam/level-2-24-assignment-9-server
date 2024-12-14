import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { TImageFiles } from "./products.constant";
import { productService } from "./products.service";

const createProduct = tryCatchAsync(async (req, res) => {
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
    data: result,
  });
});

export const productController = {
  createProduct,
  getProduct,
};
