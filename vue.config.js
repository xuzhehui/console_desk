module.exports = {
    publicPath:'./',
    outputDir:'dist',
    assetsDir:'static',
    indexPath:'index.html',
    devServer: {
        proxy: {
          '/proxy': {
            target: 'http://121.41.102.225:82', 
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