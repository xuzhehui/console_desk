module.exports = {
    publicPath:'./',
    outputDir:'dist',
    assetsDir:'static',
    indexPath:'index.html',
    devServer: {
        proxy: {
          '/proxy': {
            target: 'http://192.168.0.175:8080', 
            ws: true, // proxy websockets
            changeOrigin: true,
            pathRewrite: {
              '^/proxy': '' // rewrite path
            }
          }
        } 
    },
    lintOnSave: false//禁用eslint  便于开发
}