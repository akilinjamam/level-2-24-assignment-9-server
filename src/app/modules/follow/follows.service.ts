import { PrismaClient } from "@prisma/client";
import { TFollows } from "./follows.constant";

const prisma = new PrismaClient();

const createFollow = async (data: TFollows) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const findVendor = await prisma.follow.findMany({
        where: {
          vendorId: data.vendorId,
        },
      });

      const isUserExistInThisVendorOrNot = findVendor?.find(
        (f) => f?.userId === data.userId
      );

      console.log(isUserExistInThisVendorOrNot);

      if (isUserExistInThisVendorOrNot) {
        const deletedFollow = await prisma.follow.delete({
          where: {
            followId: isUserExistInThisVendorOrNot?.followId,
          },
        });

        const findUsers = await prisma.follow.findMany({
          where: {
            vendorId: data.vendorId,
          },
        });

        const newFollowerCount = findUsers?.length;

        const newVendorUpdatedData = {
          followedCount: newFollowerCount,
        };

        await prisma.vendor.update({
          where: {
            vendorId: data.vendorId,
          },
          data: newVendorUpdatedData,
        });

        return {
          message: "follow deleted successfully",
          result: deletedFollow,
        };
      }

      const createFollow = await prisma.follow.create({
        data: data,
      });

      const findUsers = await prisma.follow.findMany({
        where: {
          vendorId: data.vendorId,
        },
      });

      const newFollowerCount = findUsers?.length;

      const newVendorUpdatedData = {
        followedCount: newFollowerCount,
      };

      await prisma.vendor.update({
        where: {
          vendorId: data.vendorId,
        },
        data: newVendorUpdatedData,
      });

      return {
        message: "follow created successfully",
        result: createFollow,
      };
    });

    return result;
  } catch (error) {
    console.error("Transaction failed, rolled back:", error);
  } finally {
    await prisma.$disconnect();
  }
};
const getFollow = async () => {
  const result = await prisma.follow.findMany({
    include: {
      user: true,
      vendor: true,
    },
  });

  return result;
};

export const followService = {
  createFollow,
  getFollow,
};
