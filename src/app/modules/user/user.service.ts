import { PrismaClient, UserType } from "@prisma/client";
import { TLogin, TUser } from "./user.constant";
import { createToken } from "../../../token/createToken";

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

  /* 
    JWT_ACCESS_SECRET=6d28b4f8aa1ad046ffef1290ca98341ea2d921c68d488755ff6ea7cbedbad5dd
    JWT_ACCESS_EXPIRES_IN=5d
  */

  const jwt_token = process.env.JWT_ACCESS_SECRET;
  const jwt_expires_id = process.env.JWT_ACCESS_EXPIRES_IN;

  const jwtPayload = {
    userName: findUser?.userName,
    email: findUser?.email,
    address: findUser?.address,
    UserType: findUser?.userType,
    phoneNumber: findUser?.phoneNumber,
    userType: findUser?.userType,
  };

  console.log(jwt_token);

  let token;
  const getTokens = createToken(
    jwtPayload,
    jwt_token as string,
    jwt_expires_id as string
  );

  token = getTokens;

  return { accesstoken: token };
};

export const userService = {
  createUser,
  createLogin,
};
