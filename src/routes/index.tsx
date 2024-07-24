import { RouteObject, useRoutes } from 'react-router-dom';
import Home from '@pages/Home';
import About from '@pages/About';
import { Suspense, useMemo } from 'react';

/**
 * 注册页面路由
 */
const routeList: RouteObject[] = [
  {
    path: '/',
    children: [
      { path: '/', index: true, element: <Home /> },
      { path: '/home', element: <Home /> },
      // about 页面使用KeepAlive，需设置id
      { path: '/about', element: <About /> },
      { path: '*', element: <div>未找到页面</div> },
    ],
  },
];

const generateRouter = (routes: RouteObject[]) => {
  return routes.map((item) => {
    if (item.element) {
      item.element = <Suspense>{item.element}</Suspense>;
    }
    if (item.children?.length) {
      item.children = generateRouter(item.children);
    }
    return item;
  });
};

const Router = () => {
  const routes = useMemo(() => generateRouter(routeList), []);
  return useRoutes(routes);
};

export { Router, routeList };
