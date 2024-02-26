export interface IUserLoginCredentials {
  email: string;
  password: string;
}

export interface IUserRegisterCredentials extends IUserLoginCredentials {
  username: string;
}
