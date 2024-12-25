import { PrismaClient, UserType } from "@prisma/client";
import {
  TChangePassword,
  TLogin,
  TRecoveryPassword,
  TUser,
} from "./user.constant";
import { createToken } from "../../../token/createToken";
import { DecodedToken } from "../../../auth/auth";
import { sendEmail } from "../../../sendMail/sendMail";

const prisma = new PrismaClient();

const createUser = async (data: TUser) => {
  console.log(data);

  const result = await prisma.user.create({
    data: data,
  });

  return result;
};

const createLogin = async (data: TLogin) => {
  const findUser = (await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  })) as TUser | null;

  if (!findUser) {
    throw new Error("user not found");
  }

  console.log(findUser);

  if (findUser?.password !== data.password) {
    throw new Error("password did not matched");
  }

  const jwt_token = process.env.JWT_ACCESS_SECRET;
  const jwt_expires_id = process.env.JWT_ACCESS_EXPIRES_IN;

  const jwtPayload = {
    userId: findUser?.userId,
    userName: findUser?.userName,
    email: findUser?.email,
    address: findUser?.address,
    UserType: findUser?.userType,
    phoneNumber: findUser?.phoneNumber,
    userType: findUser?.userType,
  };

  let token;
  const getTokens = createToken(
    jwtPayload,
    jwt_token as string,
    jwt_expires_id as string
  );

  token = getTokens;

  return { accesstoken: token };
};

const changePassword = async (data: TChangePassword, getUser: DecodedToken) => {
  console.log(getUser);

  const newData = {
    password: data.newPassword,
  };

  const findUser = await prisma.user.findFirst({
    where: {
      email: getUser?.email,
    },
  });

  const oldPassword = findUser?.password;

  if (oldPassword !== data.oldPassword) {
    throw new Error("old password did not matched");
  }

  const result = await prisma.user.update({
    where: {
      email: getUser?.email as string,
    },
    data: newData,
  });

  return result;
};

const resetPassword = async (data: TRecoveryPassword) => {
  const findUser = (await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  })) as any;

  console.log(data);

  const { password, ...remaining } = findUser;

  const jwtPayload = remaining;

  console.log(jwtPayload);

  const resetToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    "10m"
  );

  const htmlUiLink = `https://level-2-24-assignment-9-client.vercel.app/recoveryPassword?userToken=${resetToken}`;

  sendEmail(data.email, htmlUiLink);

  return data;
};

const recoverPassword = async (data: any) => {
  const updatePassword = await prisma.user.update({
    where: {
      email: data.email,
    },
    data: {
      password: data.password,
    },
  });

  return updatePassword;
};

const updateUser = async (id: string, data: any) => {
  const result = await prisma.user.update({
    where: {
      userId: id,
    },
    data,
  });

  return result;
};
const getAllUser = async () => {
  const result = await prisma.user.findMany({});

  return result;
};

const deletelUser = async (id: string) => {
  try {
    const result = await prisma.$transaction(async (prix) => {
      const findPurchaseProducts = await prix.purchasedProduct.findMany({
        where: {
          userId: id,
        },
      });
      const findRatingIds = await prix.rating.findMany({
        where: {
          userId: id,
        },
      });

      const findFollowIds = await prix.follow.findMany({
        where: {
          userId: id,
        },
      });

      const findReviewIds = await prix.review.findMany({
        where: {
          userId: id,
        },
      });
      const findReplayIds = await prix.replay.findMany({
        where: {
          userId: id,
        },
      });

      const findVendorIds = await prix.vendor.findMany({
        where: {
          userId: id,
        },
      });

      const getPurchaseProductsIds = findPurchaseProducts?.map(
        (item) => item?.purchasedProductId
      );
      const getRatingIds = findRatingIds?.map((item) => item?.ratingId);
      const getFollowIds = findFollowIds?.map((item) => item?.followId);
      const getReviewIds = findReviewIds?.map((item) => item?.reviewId);
      const getReplayIds = findReplayIds?.map((item) => item?.replayId);
      const getProductIds = findPurchaseProducts?.map(
        (item) => item?.productId
      );
      const getVendorIds = findVendorIds?.map((item) => item?.vendorId);

      if (getFollowIds?.length > 0) {
        await prix.follow.deleteMany({
          where: {
            followId: { in: getFollowIds },
          },
        });
      }

      if (getRatingIds?.length > 0) {
        await prix.rating.deleteMany({
          where: {
            ratingId: { in: getRatingIds },
          },
        });
      }

      if (getReplayIds?.length > 0) {
        await prix.replay.deleteMany({
          where: {
            replayId: { in: getReplayIds },
          },
        });
      }

      if (getReviewIds?.length > 0) {
        await prix.review.deleteMany({
          where: {
            reviewId: { in: getReviewIds },
          },
        });
      }

      if (getPurchaseProductsIds?.length > 0) {
        await prix.purchasedProduct.deleteMany({
          where: {
            purchasedProductId: { in: getPurchaseProductsIds },
          },
        });
      }
      if (getPurchaseProductsIds?.length > 0) {
        await prix.products.deleteMany({
          where: {
            productId: { in: getProductIds },
          },
        });
      }

      if (getVendorIds?.length > 0) {
        await prix.vendor.deleteMany({
          where: {
            vendorId: { in: getVendorIds },
          },
        });
      }

      await prix.user.delete({
        where: {
          userId: id,
        },
      });

      return {
        purchasedProductIds: getPurchaseProductsIds,
        getProductIds,
        getRatingIds: getRatingIds,
        getFolowIds: getFollowIds,
        getReviewIds: getReviewIds,
        getReplayIds,
        getVendorIds,
      };
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }

  // const result = await prisma.user.delete({
  //   where: {
  //     userId: id,
  //   },
  // });
};

export const userService = {
  createUser,
  createLogin,
  changePassword,
  resetPassword,
  recoverPassword,
  updateUser,
  getAllUser,
  deletelUser,
};
