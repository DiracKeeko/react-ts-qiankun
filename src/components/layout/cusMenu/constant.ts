import { MenuItem, MenuRes } from '@/api/global/constant';

const isMenuColItemAllHidden = (menuColArr: MenuItem[]): boolean => {
  return !menuColArr || menuColArr.length === 0 || menuColArr.every(el => el.hidden === 1);
}

const isMenuPopupHidden = (menuArr: MenuItem[][]): boolean => {
  return !menuArr || menuArr.length === 0 || menuArr.every(el => isMenuColItemAllHidden(el));
}

type MenuResType = '隐藏' | '一级' | '二级';

const judgeMenuItemType = (menuRes: MenuRes): MenuResType => {
  if (!menuRes.menuArr && /^\d+$/.test(menuRes.index)) {
    return '隐藏';
  }
  if (isMenuPopupHidden(menuRes.menuArr)) {
    return '一级';
  }
  return '二级';
}

export { judgeMenuItemType };
