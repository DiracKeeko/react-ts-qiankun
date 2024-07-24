/**
 * 全局通用类型定义
 */
export type Option = { label: string; value: string };

export interface IUserInfo {
  name: string;
  id: string;
}
export interface IGlobalContext {
  userInfo?: IUserInfo | null;
  setUserInfo: Function;
}
