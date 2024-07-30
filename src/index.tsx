import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { registerMicroApps, start } from 'qiankun';

import 'antd/dist/antd.min.css';
import './index.css';
import App from './App';

registerMicroApps([
  {
    name: 'react-micro-application', // 子应用的名称，必须唯一。
    entry: '//localhost:7777/subapp/sub-vue/', // 子应用项目本地运行地址
    container: '#micro-app-container', //  子应用的容器（子应用嵌入到主项目id为container的容器）
    activeRule: '/micro/vue-micro1', // 子应用激活时的路由规则（子应用路由）
    props: {
      // 向子应用传参
      state: false,
      userId: 'userId',
      token: '18145EWDFDEdsefEFFfdDFf145454',
    },
  },
]);

start();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <ConfigProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ConfigProvider>
  </BrowserRouter>,
);
