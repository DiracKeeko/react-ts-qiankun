import React from 'react';
import { Layout, Menu } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className='demo-logo'>
          <h1 style={{ color: '#fff' }}>名称</h1>
        </div>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <VideoCameraOutlined />,
              label: <NavLink to='/vue-micro1'>vue 1 应用</NavLink>,
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: <NavLink to='/react-micro1'>react 1 应用</NavLink>,
            },
          ]}
        />
      </Header>
      <Content
        style={{ height: 'calc(100vh - 128px)', backgroundColor: '#b4efe1' }}
        id={'micro-app-container'}
      >
        <h1>主应用显示容器</h1>
      </Content>
      <Footer style={{ textAlign: 'center' }}>一个随意的footer</Footer>
    </Layout>
  );
};
export default App;
