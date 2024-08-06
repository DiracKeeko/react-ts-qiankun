import React, { useState, useEffect } from 'react';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Outlet } from 'react-router-dom';

import { UserInfo } from '@/api/global/constant';

import CusHeader from './CusHeader';
import logo from '@/assets/logo-react.svg';
import '@/style/global.less';

const { Content, Footer } = Layout;

export const UserContext = React.createContext<UserInfo | undefined>(undefined);

const BaseLayout: React.FC = () => {
  const [user, setUser] = useState<UserInfo>();
  useEffect(() => {
    const oneUserInfo: UserInfo = {
      userId: '007',
      userName: '法外狂徒张三',
      userAuthority: '1',
    };
    setUser(oneUserInfo);
  }, []);
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <UserContext.Provider value={user}>
          <CusHeader
            icon={logo}
            title='react-qiankun'
            user={`${user?.userId}/${user?.userName}`}
          />
          <Layout className={'main'}>
            <Content id='micro-app-container' className='content'>
              <Outlet />
            </Content>
            <Footer>一个随意的footer</Footer>
          </Layout>
        </UserContext.Provider>
      </Layout>
    </ConfigProvider>
  );
};

export default BaseLayout;
