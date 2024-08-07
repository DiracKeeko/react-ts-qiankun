type UserInfo = {
  userId: string;
  userName: string;
  userAuthority: string;
}

type MenuItem = {
  index: string;
  title: string;
  hidden: 0 | 1;
  isNew: 0 | 1;
  menuType: 'inner' | 'outer' | 'holder';
  menuId: number;
  groupIndex: number;
  componentPath?: string;
  metaProperties?: string;
  description?: string;
  menuIcon?: string;
};

type MenuRes = {
  index: string;
  title: string;
  hidden: 0 | 1;
  isNew: 0 | 1;
  menuType: 'inner';
  menuId: number;
  groupIndex: number;
  menuArr: MenuItem[][];
  componentPath?: string;
  metaProperties?: string;
  description?: string;
  menuIcon?: string;
};

export type { UserInfo, MenuItem, MenuRes };