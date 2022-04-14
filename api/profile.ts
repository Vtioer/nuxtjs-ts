import { $axios } from "~/utils/request";

// 获取用户详情（数字钱包）
export async function getProfileApi(): Promise<any> {
  return await $axios({
    url: "/api/accountservice/user/wallet/profile",
    method: "get",
  });
}
// 修改用户详情（数字钱包）
export async function editProfileApi(): Promise<any> {
  return await $axios({
    url: "/api/accountservice/user/update/wallet/profile",
    method: "post",
  });
}
