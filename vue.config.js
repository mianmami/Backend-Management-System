const { defineConfig } = require('@vue/cli-service')
const path = require("path"); // 引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); // path.join(__dirname)设置绝对路径
}
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true
  },
  chainWebpack: config => {
    // 设置路径的别名， 
    // config.resolve.alias
    //   .set("@", resolve("./src"))
    //   .set("components", resolve("./src/components"))
    //   .set("views", resolve("src/views"))
    //   .set("assets", resolve("src/assets"))
    //   .set("network", resolve("src/network"))
    //   .set("common", resolve("src/common"))
    //   .set("utils", resolve("src/utils"))
    //   .set("api", resolve("src/api"))
    //   .set("plugins", resolve("src/plugins"));
   
  }

})
