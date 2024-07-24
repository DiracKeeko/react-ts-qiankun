import { IGlobalContext } from '@typings/index';
import { createContext } from 'react';

/**
 * 定义provider
 */
export const GlobalContext = createContext<IGlobalContext>({
  setUserInfo: () => {},
});

export default GlobalContext;
