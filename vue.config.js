module.exports = {
  // 反向代理
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/': {
        target: 'http://183.192.162.29:19411',
        // http://192.168.1.72:8070
        // http://183.192.162.29:18902/manapi/login
        ws: false,
        // changOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    },
    before: app => {}
  }
};