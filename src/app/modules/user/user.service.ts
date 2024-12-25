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

export const userService = {
  createUser,
  createLogin,
  changePassword,
  resetPassword,
  recoverPassword,
};
