import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  userId: string;
  userName: string;
  email: string;
  address: string;
  userType: string;
  phoneNumber: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const prisma = new PrismaClient();
    if (!token) {
      throw new Error("token not found");
    }

    const decoded = jwtDecode<DecodedToken>(token);

    const checkUser = await prisma.user.findFirst({
      where: {
        email: decoded?.email,
      },
    });

    if (!checkUser) {
      throw new Error("user not found from given token");
    }

    req.user = decoded;

    next();
  };
};

export default auth;
