const path = require('path');
const apiMocker = require('mocker-api');

module.exports = function (app) {
  apiMocker(app, path.resolve(__dirname, '../mock/index.js'), {
    proxy: {},
    changeHost: true,
  });
};
