import { $axios } from "~/utils/request";

export interface DetailsParamsType {
  address: string;
  tokenid: string;
}

// 获取用户详情（数字钱包）
export async function getDetailsApi(params: DetailsParamsType): Promise<any> {
  return await $axios({
    url: "/api/dcservice/item/open/description",
    method: "get",
    params,
  });
}
