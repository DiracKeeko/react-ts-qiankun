const path = require('path');
const webpack = require('webpack');
const { whenProd, when } = require('@craco/craco');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CracoLessPlugin = require('craco-less');
const CracoExternalsPlugin = require('./config/craco-externals');
const CracoHtmlPlugin = require('./config/craco-html');
const CracoOutputPlugin = require('./config/craco-output');
const TerserPlugin = require('terser-webpack-plugin');
const type = 'pc';

module.exports = function () {
  return {
    eslint: {
      enable: false
    },
    style: {
      modules: {
        modules: true,
        localIdentName: '[local]_[hash:base64:5]',
      },
      ...when(type === 'mobile', () => ({
        postcss: {
          mode: 'extends',
          loaderOptions: {
            postcssOptions: {
              ident: 'postcss',
              plugins: [
                [
                  'postcss-pxtorem',
                  {
                    rootValue: 37.5, // (Number | Function) 表示根元素字体大小或根据input参数返回根元素字体大小
                    propList: ['*'], // 可以从 px 更改为 rem 的属性 使用通配符*启用所有属性
                    exclude: /node_modules/i, // 要忽略并保留为 px 的文件路径
                  },
                ],
              ],
            },
          },
        },
      })),
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
              process.env.ANALYZE === 'true' &&
                new BundleAnalyzerPlugin({
                  analyzerMode: 'static',
                  generateStatsFile: true,
                  openAnalyzer: false,
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
      /** 输出配置 */
      {
        plugin: CracoOutputPlugin,
        options: {
          publicPath: process?.env?.PUBLIC_URL ?? './',
        },
      },
      /** 使用CSS-Module 规范 */
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              javascriptEnabled: true,
              math: 'always',
            },
          },
          modifyLessRule(lessRule) {
            lessRule.exclude = /(\.module)\.less$/;
            return lessRule;
          },
          modifyLessModuleRule(lessModuleRule) {
            lessModuleRule.test = /\.module\.less$/;
            lessModuleRule.exclude = /node_modules/;
            return lessModuleRule;
          },
        },
      },
      /** 公共资源通过外部引入而不打包到构建结果中 */
      ...whenProd(
        () => [
          {
            plugin: CracoExternalsPlugin,
            options: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        ],
        [],
      ),
      {
        plugin: CracoHtmlPlugin,
        options: {
          publicPath: process?.env?.PUBLIC_URL ?? './',
          filename: 'index.html',
        },
      },
    ],
    /** 本地开发调试配置 */
    devServer: (devServerConfig) => {
      return devServerConfig;
    },
  };
};
