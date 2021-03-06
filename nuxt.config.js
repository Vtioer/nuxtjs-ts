const path = require('path');

export default {
  head: {
    title: "nuxt2-app",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover",
      },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto&display=swap",
      },
    ],
  },

  css: ["~/assets/css/reset.css", "~/assets/css/global.scss"],

  plugins: ["~/plugins/axios-accessor", "~/plugins/svg-icon"],

  components: true,

  buildModules: ["@nuxt/typescript-build"],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "cookie-universal-nuxt",
    "bootstrap-vue/nuxt",
  ],

  build: {
    extend(config, context) {
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find((rule) =>
        rule.test.test(".svg")
      );
      svgRule.exclude = [path.resolve(__dirname, "assets/icons/svg")];

      //添加loader规则
      config.module.rules.push({
        test: /.svg$/, //匹配.svg
        include: [path.resolve(__dirname, "assets/icons/svgs")], //将存放svg的目录加入到loader处理目录
        use: [
          { loader: "svg-sprite-loader", options: { symbolId: "icon-[name]" } },
        ],
      });
    },
  },
  server: {
    port: process.env.PORT || 3000,
    host: process.env.DOMAIN.replace("https://", "") || "0.0.0.0",
  },
  axios: {
    // proxy: true, // 代理
    baseURL:
      `${process.env.HOST_API}` || `localhost:${process.env.PORT || 3000}`,
  },
  proxy: {
    https: true,
    // "/api": {
    //   target: "http://localhost:4000",
    //   pathRewrite: {
    //     "^/api": "",
    //   },
    // },
  },
};
