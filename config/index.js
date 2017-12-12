// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'admin_static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 3000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'admin_static',
    assetsPublicPath: '/',
    proxyTable: {
        '/cross': {
            target: 'http://test.online.gintong.com/cross',changeOrigin: true,pathRewrite: {"^/cross" : ""}
        },
        '/crossmeeting': {
            target: 'http://test.online.gintong.com/crossmeeting',changeOrigin: true,pathRewrite: {"^/crossmeeting" : ""}
        },
        '/demand': {
            target: 'http://test.online.gintong.com/demand',changeOrigin: true,pathRewrite: {"^/demand" : ""}
        },
        '/ask-answer': {
            target: 'http://test.online.gintong.com/ask-answer',changeOrigin: true,pathRewrite: {"^/ask-answer" : ""}
        },
        '/vod': {
            target: 'http://test.online.gintong.com/vod',changeOrigin: true,pathRewrite: {"^/vod" : ""}
        },
        '/pub': {
            target: 'http://test.online.gintong.com/cross/asso/pub',changeOrigin: true,pathRewrite: {"^/pub" : ""}
        },
        '/permission': {
            target: 'http://test.online.gintong.com/permission',changeOrigin: true,pathRewrite: {"^/permission" : ""}
        },
        '/metadata': {
            target: 'http://test.online.gintong.com/metadata',changeOrigin: true,pathRewrite: {"^/metadata" : ""}
        },
        '/tags': {
            target: 'http://test.online.gintong.com/cross',changeOrigin: true,pathRewrite: {"^/tags" : ""}
        },
        '/directory': {
            target: 'http://test.online.gintong.com/directory',changeOrigin: true,pathRewrite: {"^/directory" : ""}
        },
        '/crossApi': {
            target: 'http://api.test.gintong.com',changeOrigin: true,pathRewrite: {"^/directory" : ""}
        },
        '/community': {
            target: 'http://test.online.gintong.com/community',changeOrigin: true,pathRewrite: {"^/community" : ""}
        },
        '/meeting': {
            target: 'http://test.online.gintong.com/meeting',changeOrigin: true,pathRewrite: {"^/meeting" : ""}
        },
        '/crossimserver': {
            target: 'http://test.online.gintong.com/crossimserver',changeOrigin: true,pathRewrite: {"^/crossimserver" : ""}
        },
        '/cross/newknowledge/': {
            target: 'http://test.online.gintong.com/knowledge',changeOrigin: true,pathRewrite: {"^/knowledge" : ""}
        },
        '/knowledge': {
            target: 'http://test.online.gintong.com/knowledge',changeOrigin: true,pathRewrite: {"^/knowledge" : ""}
        },
        '/column': {
            target: 'http://test.online.gintong.com/column',changeOrigin: true,pathRewrite: {"^/column" : ""}
        },
        '/payment': {
            target: 'http://test.online.gintong.com/payment',changeOrigin: true,pathRewrite: {"^/payment" : ""}
        },
        '/dynamicNews': {
            target: 'http://test.online.gintong.com/dynamicNews',changeOrigin: true,pathRewrite: {"^/dynamicNews" : ""}
        },
        '/mobile': {
            target: 'http://test.online.gintong.com/mobile',changeOrigin: true,pathRewrite: {"^/mobile" : ""}
        },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
