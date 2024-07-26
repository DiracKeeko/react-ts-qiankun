const CracoLessPlugin = require('craco-less');

module.exports = function () {
  return {
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
  };
};
