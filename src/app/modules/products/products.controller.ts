import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { productService } from "./products.service";

const createProduct = tryCatchAsync(async (req, res) => {
  const result = await productService.createProductService(req.body);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product created successfully",
    data: result,
  });
});

export const productController = {
  createProduct,
};
