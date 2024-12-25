import { PrismaClient } from "@prisma/client";

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
    await prisma.$transaction(async (prismaTrans) => {
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
      // const findPurchaseProductPrice = findPurchaseProduct?.price;
      // const findPurchaseProductDiscount = findPurchaseProduct?.price;

      const updateQuantityDataForProducts =
        (findProduct?.quantity as number) - findPurchaseProductQunatity;

      let newStock = true;
      if (updateQuantityDataForProducts === 0) {
        newStock = false;
      }

      const newUpdatedDataForProduct = {
        quantity: updateQuantityDataForProducts,
        stock: newStock,
        discount: findPurchaseProduct?.discount,
      };

      await prismaTrans.products.update({
        where: {
          productId: productId,
        },
        data: newUpdatedDataForProduct,
      });

      await prismaTrans.purchasedProduct.update({
        where: {
          purchasedProductId: purchasedProductId,
        },
        data: {
          purchased: true,
        },
      });
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
const getCartWithUserId = async (id: string) => {
  const result = await prisma.purchasedProduct.findMany({
    where: {
      userId: id,
      purchased: false,
    },
  });
  return result;
};

const deleteCartWithId = async (id: string) => {
  const result = await prisma.purchasedProduct.delete({
    where: {
      purchasedProductId: id,
    },
  });
  return result;
};

import { UserType } from "@prisma/client";

const getPurchasedHistory = async (id: string, userType: UserType) => {
  if (userType === "ADMIN") {
    const result = await prisma.purchasedProduct.findMany({
      include: {
        Review: {
          include: {
            Replay: true,
          },
        },
      },
    });

    return result;
  }
  if (userType === "VENDOR") {
    const findVendorId = await prisma.vendor.findFirst({
      where: {
        userId: id,
      },
    });

    if (!findVendorId) {
      throw new Error("Vendor not found");
    }

    const vendorId = findVendorId.vendorId;

    const result = await prisma.purchasedProduct.findMany({
      where: {
        vendorId: vendorId,
        purchased: true,
      },
      include: {
        Review: {
          include: {
            Replay: true,
          },
        },
      },
    });

    return result;
  }

  if (userType === "USER") {
    const result = await prisma.purchasedProduct.findMany({
      where: {
        userId: id,
        purchased: true,
      },
      include: {
        Review: {
          include: {
            Replay: true,
          },
        },
      },
    });

    return result;
  }
};

const replaceCart = async (data: any) => {
  const findAllSameVendor = await prisma.purchasedProduct.findMany({
    where: {
      userId: data.userId,
      purchased: false,
    },
  });
  const getAllProductIds = findAllSameVendor?.map(
    (ids) => ids.purchasedProductId
  );

  try {
    const result = await prisma.$transaction(async (prix) => {
      await prix.purchasedProduct.deleteMany({
        where: {
          purchasedProductId: { in: getAllProductIds },
        },
      });

      const result = await prix.purchasedProduct.create({
        data,
      });

      return result;
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const purchasedProductService = {
  successPayment,
  addToCart,
  createPayment,
  getCartWithUserId,
  getPurchasedHistory,
  deleteCartWithId,
  replaceCart,
};
