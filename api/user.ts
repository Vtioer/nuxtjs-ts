import { $axios } from "~/utils/request";
import {
  LoginParamsType,
  ThirdLoginParamsType,
  RegisterParamsType,
  SendEmailCodeParamsType,
  CheckEmailCodeParamsType,
  ResetPwdParamsType,
} from "~/types/user";

// 登录
export async function loginApi(data: LoginParamsType): Promise<any> {
  return await $axios({
    url: "/api/accountservice/open/login",
    method: "post",
    data,
  });
}

// 三方登录
export async function thirdLoginApi(
  params: ThirdLoginParamsType
): Promise<any> {
  return await $axios({
    url: "/api/accountservice/open/auto",
    method: "post",
    data: params,
  });
}

// 注册
export async function registerApi(data: RegisterParamsType): Promise<any> {
  return await $axios({
    url: "/api/accountservice/open/register",
    method: "post",
    data,
  });
}

// 发送邮箱验证码
export async function sendEmailCodeApi(
  data: SendEmailCodeParamsType
): Promise<any> {
  return await $axios({
    url: "/api/accountservice/open/sendemail",
    method: "get",
    data,
  });
}

// 校验邮箱验证码
export async function checkEmailCodeApi(
  data: CheckEmailCodeParamsType
): Promise<any> {
  return await $axios({
    url: "/api/accountservice/open/checkcode",
    method: "post",
    data,
  });
}

// 验证邮箱是否存在
export async function checkEmailExistApi(params: string): Promise<any> {
  return await $axios({
    url: "/api/accountservice/open/checkemail",
    method: "get",
    params,
  });
}

// 重置密码
export async function resetPwddApi(data: ResetPwdParamsType): Promise<any> {
  return await $axios({
    url: "/api/accountservice/open/resetpassword",
    method: "post",
    data,
  });
}
