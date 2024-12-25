import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { paymentInitialization } from "./purchasedProduct.paymentInitialization";
import { purchasedProductService } from "./purchasedProduct.service";
import { v4 as uuidv4 } from "uuid";
import { paymentHtml } from "./successPayment.html";
import { UserType } from "@prisma/client";

const createPayment = tryCatchAsync(async (req, res) => {
  const { productId, purchasedProductId } = req.body;

  const result = await purchasedProductService.createPayment(req.body);

  const uniqueId = uuidv4();

  const paymentInfodata = {
    tran_id: uniqueId,
    cus_name: "xyz",
    cus_email: "example@gmail.com",
    cus_add1: "chittagong",
    cus_city: "chittagong",
    cus_state: "chittagong",
    cus_country: "Bangladesh",
    cus_phone: "123456789",
    productId: productId,
    purchasedProductId: purchasedProductId,
    amount: "100",
  };

  const paymentUrl = await paymentInitialization(paymentInfodata);

  console.log();

  res.status(200).json({
    success: true,
    status: 200,
    message: "payment done successfully",
    data: {
      url: paymentUrl?.data?.payment_url,
      result: result,
    },
  });
});

const successPayment = tryCatchAsync(async (req, res) => {
  const { productId, purchasedProductId } = req.query;
  console.log(productId, purchasedProductId);
  const result = await purchasedProductService.successPayment(
    productId as string,
    purchasedProductId as string
  );

  res.send(paymentHtml);
});
const addToCart = tryCatchAsync(async (req, res) => {
  const result = await purchasedProductService.addToCart(req.body);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product added to cart successfully",
    data: result,
  });
});
const getCartWithUserId = tryCatchAsync(async (req, res) => {
  const { id } = req?.params;
  const result = await purchasedProductService.getCartWithUserId(id);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product found by user id successfully",
    data: result,
  });
});

const getPurchasedHistory = tryCatchAsync(async (req, res) => {
  const userType = req?.user?.userType;
  const userId = req?.user?.userId;

  const result = await purchasedProductService.getPurchasedHistory(
    userId as string,
    userType as UserType
  );

  res.status(200).json({
    success: true,
    status: 200,
    message: "Purchased product found by user id successfully",
    data: result,
  });
});
const deleteCartWithId = tryCatchAsync(async (req, res) => {
  const { id } = req?.params;
  const result = await purchasedProductService.deleteCartWithId(id);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product deleted id successfully",
    data: result,
  });
});

const replaceCart = tryCatchAsync(async (req, res) => {
  const result = await purchasedProductService.replaceCart(req.body);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Product replaced successfully",
    data: result,
  });
});

export const purchasedProductController = {
  successPayment,
  addToCart,
  createPayment,
  getCartWithUserId,
  deleteCartWithId,
  getPurchasedHistory,
  replaceCart,
};
