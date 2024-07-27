const path = require('path');
const webpack = require('webpack');
const { whenProd, when } = require('@craco/craco');
const CompressionPlugin = require('compression-webpack-plugin');
const CracoLessPlugin = require('craco-less');
const TerserPlugin = require('terser-webpack-plugin');

const type = 'pc';

// console.log('process.env.WORKS_ENV->', process.env.WORKS_ENV);

module.exports = function () {
  return {
    eslint: {
      enable: false,
    },
    style: {
      modules: {
        modules: true,
        localIdentName: '[local]_[hash:base64:5]',
      },
    },
    ...when(type === 'pc', () => ({
      babel: {
        plugins: [
          /** antd 按需引入优化 */
          ['import', { libraryName: 'antd', style: true, libraryDirectory: 'es' }],
        ],
      },
    })),
    webpack: {
      /** 引入模块时，建议使用路径别名，不建议使用相对路径层层查找 */
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@routes': path.resolve(__dirname, './src/routes'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@providers': path.resolve(__dirname, './src/providers'),
        '@components': path.resolve(__dirname, './src/components'),
        '@apis': path.resolve(__dirname, './src/apis'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@typings': path.resolve(__dirname, './src/typings'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
      },
      plugins: {
        add: [
          new webpack.DefinePlugin({
            'process.env.WORKS_ENV': JSON.stringify(process.env.WORKS_ENV),
          }),
          // prd环境删除console.log
          when(
            process.env.WORKS_ENV === 'prd',
            () =>
              new TerserPlugin({
                terserOptions: {
                  compress: {
                    drop_console: true,
                    drop_debugger: true,
                    pure_funcs: ['console.log'],
                  },
                },
              }),
          ),
          ...whenProd(() => {
            return [
              new CompressionPlugin({
                test: /\.(js|css|png|svg|jpg|jpeg|webp|woff2?|ttf|eot)$/,
              }),
            ].filter(Boolean);
          }, []),
        ].filter(Boolean),
      },
      configure: (webpackConfig) => {
        webpackConfig.devtool = process?.env?.WORKS_ENV === 'local' ? 'source-map' : false;
        return webpackConfig;
      },
    },
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            // 配置可以参照webpack的less-loader具体配置
            lessOptions: {
              javascriptEnabled: true, // 允许less文件中使用js表达式
              math: 'always',
            },
          },
        },
      },
    ],
    devServer: {
      port: 3003,
      // open: true,
      hot: true,
      client: {
        overlay: false,
      },
      // 配置代理解决跨域
      proxy: {
        '/': {
          changeOrigin: true,
          pathRewrite: {
            '^/': '',
          },
        },
      },
    },
  };
};
