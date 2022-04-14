import { $axios } from "~/utils/request";


// 获取用户详情
export async function getUserInfo(): Promise<any> {
  return await $axios({
    url: "",
    method: "get",
    params,
  });
}
