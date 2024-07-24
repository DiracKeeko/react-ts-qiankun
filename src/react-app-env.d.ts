/// <reference types="react-scripts" />
/**
 * 全局类型声明
 */

/**
 * svg 图片当做component引入
 */
declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}
/**
 * CSS-Module规范下LESS样式文件声明
 */
declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

/**
 * 包装见微平台TS声明
 */

declare module "react/jsx-runtime" {
  export default any;
}
