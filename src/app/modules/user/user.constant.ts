export type TUser = {
  userId?: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  userType: "USER" | "VENDOR";
};

export type TLogin = {
  email: string;
  password: string;
};
export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type TRecoveryPassword = {
  email: string;
};
