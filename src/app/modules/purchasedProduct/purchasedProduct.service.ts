import { PrismaClient } from "@prisma/client";

import { paymentInitialization } from "./purchasedProduct.paymentInitialization";
const prisma = new PrismaClient();

const createPayment = async (data: any) => {
  const { purchasedProductId, productId, quantity, price, discount } = data;
  console.log(purchasedProductId, productId);

  const totalPrice = quantity * price - discount;

  const newPurchasedProductUpdatedData = {
    price,
    quantity,
    discount,
    totalPrice,
  };

  console.log(newPurchasedProductUpdatedData);

  try {
    const result = await prisma.$transaction(async (prix) => {
      const result = await prix.purchasedProduct.update({
        where: {
          purchasedProductId: purchasedProductId,
        },
        data: newPurchasedProductUpdatedData,
      });

      return result;
    });

    return result;
  } catch (error) {
    console.error("Transaction failed, rolled back:", error);
  } finally {
    await prisma.$disconnect();
  }
};

const successPayment = async (
  productId: string,
  purchasedProductId: string
) => {
  try {
    const result = await prisma.$transaction(async (prismaTrans) => {
      const findProduct = await prismaTrans.products.findFirst({
        where: {
          productId: productId,
        },
      });

      const findPurchaseProduct = (await prismaTrans.purchasedProduct.findFirst(
        {
          where: {
            purchasedProductId: purchasedProductId,
          },
        }
      )) as any;

      if (
        (findPurchaseProduct?.quantity as number) >
        (findProduct?.quantity as number)
      ) {
        throw new Error(
          "purchased Quantity can not exceed total Stock Quantity"
        );
      }

      const findPurchaseProductQunatity = findPurchaseProduct?.quantity;
      const findPurchaseProductPrice = findPurchaseProduct?.price;
      const findPurchaseProductDiscount = findPurchaseProduct?.price;

      const updateQuantityDataForProducts =
        (findProduct?.quantity as number) - findPurchaseProductQunatity;

      let newStock;
      if (updateQuantityDataForProducts === 0) {
        newStock = false;
      }

      const newUpdatedDataForProduct = {
        quantity: updateQuantityDataForProducts,
        stock: newStock,
      };

      await prismaTrans.products.update({
        where: {
          productId: productId,
        },
        data: newUpdatedDataForProduct,
      });

      const newTotalPrice =
        findPurchaseProductPrice * findPurchaseProductQunatity -
        findPurchaseProductDiscount;

      const newPurchasedUpdatedData = {
        price: findPurchaseProductPrice,
        quantity: findPurchaseProductQunatity,
        totalPrice: newTotalPrice,
        discount: findPurchaseProductDiscount,
      };
    });
  } catch (error) {
    console.error("Transaction failed, rolled back:", error);
  } finally {
    await prisma.$disconnect();
  }

  return "";
};

const addToCart = async (data: any) => {
  const result = await prisma.purchasedProduct.create({
    data,
  });
  return result;
};

export const purchasedProductService = {
  successPayment,
  addToCart,
  createPayment,
};
