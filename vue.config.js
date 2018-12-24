module.exports = {
  // webpack-dev-server 的配置项
  devServer: {
    // proxy用于配置代理
    proxy: {
      // 当请求的接口中包含/api字段时，会走代理服务服务器
      '/api': {
        // 代理服务器的地址
        target: 'http://localhost:8888',
        // 允许改变域
        changeOrigin: true
      }
    }
  }
}
