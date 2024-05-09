export declare namespace API {
  type TLogin = {
    userName: string;
    password: string;
  };
  type TRegisterInfo = {
    userName: string;
    password: string;
    email: string;
    birthday: string;
    avatar: string;
  };
  type TChangePassword = {
    userName: string;
    oldPassword: string;
    newPassword: string;
  };
  type TTableParams = {
    pageSize: number;
    page: number;
  };
  type TTbaleItem = {
    id: number;
    user_name: string;
    date_: string;
    province: string;
    city: string;
    address: string;
    zip: string;
  }
}
