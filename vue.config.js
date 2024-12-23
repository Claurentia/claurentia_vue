const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3030,
    webSocketServer: false,
    host: 'localhost',
    allowedHosts: 'all'
  },
  publicPath: "/claurentia_vue/"
})