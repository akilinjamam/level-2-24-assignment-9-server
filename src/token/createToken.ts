import jwt from "jsonwebtoken";
export const createToken = (
  jwtPayload: {
    email: string;
    userName: string;
    address: string;
    userType: string;
    phoneNumber: string;
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
