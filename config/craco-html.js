const { getPlugin, pluginByName, whenProd } = require('@craco/craco');

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
    const { isFound, match } = getPlugin(webpackConfig, pluginByName('HtmlWebpackPlugin'));
    if (isFound) {
      const { userOptions } = match;
      const { publicPath = '', filename = 'index.html' } = pluginOptions;

      userOptions.publicPath = publicPath;
      whenProd(() => {
        userOptions.meta = {
          timestamp: `${Date.now()}`,
        };
        userOptions.filename = filename;
      });
    }

    return webpackConfig;
  },
};
