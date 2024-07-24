import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { Router } from '../routes';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

const MainContent: React.FC = () => {
  const navigate = useNavigate();
  const MENU_LIST: ItemType[] = [
    { key: '/home', label: '首页', onClick: () => navigate('/home') },
    { key: '/about', label: '关于', onClick: () => navigate('/about') },
  ];

  const { Header, Content } = Layout;

  return (
    <Layout className={styles.container}>
      <Header>
        <Menu
          theme='dark'
          mode='horizontal'
          items={MENU_LIST}
          defaultSelectedKeys={[window.location.pathname === '/' ? '/home' : window.location.pathname]}
        />
      </Header>
      <Content>
        <Router />
      </Content>
    </Layout>
  );
};

export default MainContent;
