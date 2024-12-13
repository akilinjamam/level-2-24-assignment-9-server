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

  const result = await prisma.user.update({
    where: {
      email: getUser?.email as string,
    },
    data: newData,
  });

  return result;
};

const resetPassword = async (
  data: TRecoveryPassword,
  userInfo: DecodedToken
) => {
  const { iat, exp, ...remaining } = userInfo as any;

  const jwtPayload = remaining;

  console.log(jwtPayload);

  const resetToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    "10m"
  );

  const htmlUiLink = `https://level-2-24-assignment-9-client.vercel.app/recoveryPassword/user?token=${resetToken}`;

  sendEmail(data.email, htmlUiLink);

  return data;
};

export const userService = {
  createUser,
  createLogin,
  changePassword,
  resetPassword,
};
