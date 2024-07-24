import React from 'react';
import { Result } from 'antd';

export interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return (
    <div style={{ margin: 'auto'}}>
      <Result status='info' title='欢迎使用前蜂脚手架' subTitle='' />
    </div>
  );
};

export default About;
