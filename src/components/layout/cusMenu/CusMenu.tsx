import { Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { MenuItem, MenuRes } from '@/api/global/constant';
import menuConfig, { ConfigType } from '@/config/menuConfig';

import { judgeMenuItemType } from './constant';
import { menuResArr } from './mockMenuData';

const generateMenuItems = (config: ConfigType[]): ItemType[] => {
  const items: ItemType[] = [];
  for (const c of config) {
    switch (c.type) {
      case 'item':
        items.push({
          title: c.title,
          label: c.title,
          icon: c.icon,
          key: c.route,
        });
        break;
      case 'sub':
        items.push({
          title: c.title,
          label: c.title,
          icon: c.icon,
          key: c.route,
          children: generateMenuItems(c.children),
        });
        break;
      case 'group':
        items.push({
          type: 'group',
          label: c.title,
          children: generateMenuItems(c.children),
        });
        break;
      case 'divider':
        items.push({
          type: 'divider',
          dashed: c.dashed,
        });
        break;
      default:
        break;
    }
  }
  return items;
};

export interface CusMenuProps extends Omit<MenuProps, 'onClick' | 'items'> {
  onClick(key: string): void;
}

function createVariousMenu(menuItem: MenuItem) {
  const { Item } = Menu;
  const { menuType, index, title, isNew } = menuItem;
  let typeItem;
  if (menuType === 'outer') {
    typeItem = <a href={index}>{title}outer</a>;
  } else if (menuType === 'inner') {
    typeItem = <NavLink to={index}>{title}inner</NavLink>;
  } else {
    typeItem = <div className='submenu-holder'>{title}holder</div>;
  }
  return (
    <Item>
      {typeItem}
      {isNew === 1 && <span>(new)</span>}
    </Item>
  );
}

function createSubMenu(menuResArr: MenuRes[]) {
  const { Item, SubMenu } = Menu;
  const res = menuResArr.map((item: MenuRes) => {
    if (judgeMenuItemType(item) === '一级' && item.hidden === 0) {
      return <Item key={item.index + 'lv1'}>{item.title}</Item>;
    } else {
      // judgeMenuItemType(item) === '二级' 有3种情况
      return (
        <SubMenu key={item.index + 'lv2'} title={item.title}>
          <div className='submenu-row'>
            {item.menuArr.map((el, colIndex) => {
              return (
                <div className='submenu-col' key={colIndex}>
                  {el.map((i) => createVariousMenu(i))}
                </div>
              );
            })}
          </div>
        </SubMenu>
      );
    }
  });
  console.log("res->", res);
  return res;
}

const CusMenu: React.FC<CusMenuProps> = ({ onClick, ...others }: CusMenuProps) => {
  // const items = generateMenuItems(menuConfig);
  // return (<Menu items={items} onClick={({ key }) => onClick(key)} {...others} />);

  return (
    <Menu
      mode='horizontal'
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
    >
      {createSubMenu(menuResArr)}
    </Menu>
  );
};

export default CusMenu;
