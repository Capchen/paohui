const devIP = 'http://172.16.102.145'
const backendPort = '8080'
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/paohui/'
    : '/',
  css: {
    extract: process.env.NODE_ENV === 'production' // Default: 生产环境下是 true，开发环境下是 false 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。同样当构建 Web Components 组件时它总是会被禁用 (样式是 inline 的并注入到了 shadowRoot 中)。
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      return {
        devServer: {
          overlay: {
            warnings: true,
            errors: true
          },
          open: true,
          proxy: {
            '/mixTask': {
              target: `${devIP}:${backendPort}`,
              changeOrigin: true,
              logLevel: 'debug',
              pathRewrite: {
                '^/mixTask': '/mixTask'
              }
            },
          }
        }
      }
    }
  }
}
