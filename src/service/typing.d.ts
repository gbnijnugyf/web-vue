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
    searchName:string
  };
  type TTbaleItem = {
    id: number|null;
    userName: string;
    date_: string;
    province: string;
    city: string;
    address: string;
    zip: string;
  }
}
