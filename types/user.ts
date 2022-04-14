export interface LoginParamsType {
  email: string;
  password: string;
}

export interface CheckEmailCodeParamsType {
  email: string;
  code: string;
}
export interface ResetPwdParamsType {
  email: string;
  password: string;
  code: string;
}
export interface SendEmailCodeParamsType {
  email: string;
  type: number;
}
export interface ThirdLoginParamsType {
  registertype: number;
  email: string;
  openid: string;
}

export interface RegisterParamsType {
  email: string;
  password: string;
  code: string;
  headimgurl: string;
}

export interface LoginParamsType {
  email: string;
  password: string;
}
