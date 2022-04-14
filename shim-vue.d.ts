// 修复ts文件中引入vue文件提示没有对应模块
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
