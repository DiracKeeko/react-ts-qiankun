import React from 'react';
import { Result } from 'antd';

export interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return (
    <div style={{ margin: 'auto'}}>
      <Result status='info' title='一个(about)页面' subTitle='' />
    </div>
  );
};

export default About;
