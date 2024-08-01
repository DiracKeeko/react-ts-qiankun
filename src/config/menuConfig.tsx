import React, { lazy } from 'react';
import {
  GoldOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { MenuDividerProps, MenuItemGroupProps, MenuItemProps, SubMenuProps } from 'antd/lib/menu';

const menuConfig: ConfigType[] = [
  {
    type: 'item',
    title: '首页',
    route: '/home',
    icon: <HomeOutlined />,
    element: lazy(() => import('@/pages/Home'))
  },
  {
    type: 'item',
    title: '关于',
    route: '/about',
    icon: <GoldOutlined />,
    element: lazy(() => import('@/pages/About'))
  },
];

interface ItemProps extends Omit<MenuItemProps, 'children'> {
  type: 'item';
  title: string;
  route: string;
  element: React.LazyExoticComponent<any>;
}

interface SubProps extends Omit<SubMenuProps, 'children'> {
  type: 'sub';
  title: string;
  route: string;
  children: (ItemProps | SubProps | GroupProps | DividerProps)[];
}

interface GroupProps extends Omit<MenuItemGroupProps, 'children'> {
  type: 'group';
  title: string;
  children: (ItemProps | SubProps)[];
}

interface DividerProps extends MenuDividerProps {
  type: 'divider';
}

export type ConfigType = ItemProps | SubProps | GroupProps | DividerProps;

export default menuConfig;
