import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

import BaseLayout from '@/components/layout/BaseLayout';

import {
  VideoCameraOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const App = () => {
  return (
    <BaseLayout></BaseLayout>
    // <Layout>
    //   <Header
    //     style={{
    //       display: 'flex',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <div className='demo-logo'>
    //       <h1 style={{ color: '#fff' }}>名称</h1>
    //     </div>
    //     <Menu
    //       theme='dark'
    //       mode='horizontal'
    //       defaultSelectedKeys={['1']}
    //       items={[
    //         {
    //           key: '1',
    //           icon: <VideoCameraOutlined />,
    //           label: <NavLink to='/micro/vue-micro1'>vue 1 应用</NavLink>,
    //         },
    //         {
    //           key: '2',
    //           icon: <VideoCameraOutlined />,
    //           label: <NavLink to='/micro/react-micro1'>react 1 应用</NavLink>,
    //         },
    //       ]}
    //     />
    //     {/* <Menu
    //       mode='inline'
    //       defaultSelectedKeys={['1']}
    //       defaultOpenKeys={['sub1']}
    //       style={{ height: '100%' }}
    //     >
    //       <SubMenu key='sub1' icon={<MailOutlined />} title='Navigation One'>
    //         <Menu.ItemGroup key='g1' title='Group 1'>
    //           <Menu.Item key='1'>Option 1</Menu.Item>
    //           <Menu.Item key='2'>Option 2</Menu.Item>
    //         </Menu.ItemGroup>
    //         <Menu.ItemGroup key='g2' title='Group 2'>
    //           <Menu.Item key='3'>Option 3</Menu.Item>
    //           <Menu.Item key='4'>Option 4</Menu.Item>
    //         </Menu.ItemGroup>
    //       </SubMenu>
    //       <SubMenu key='sub2' icon={<AppstoreOutlined />} title='Navigation Two'>
    //         <Menu.ItemGroup key='g3' title='Group 3'>
    //           <Menu.Item key='5'>Option 5</Menu.Item>
    //           <Menu.Item key='6'>Option 6</Menu.Item>
    //         </Menu.ItemGroup>
    //         <Menu.ItemGroup key='g4' title='Group 4'>
    //           <Menu.Item key='7'>Option 7</Menu.Item>
    //           <Menu.Item key='8'>Option 8</Menu.Item>
    //         </Menu.ItemGroup>
    //       </SubMenu>
    //       <SubMenu key='sub4' icon={<SettingOutlined />} title='Navigation Three'>
    //         <Menu.Item key='9'>Option 9</Menu.Item>
    //         <Menu.Item key='10'>Option 10</Menu.Item>
    //         <Menu.Item key='11'>Option 11</Menu.Item>
    //         <Menu.Item key='12'>Option 12</Menu.Item>
    //       </SubMenu>
    //     </Menu> */}
    //   </Header>
    //   <div>
    //     <div style={{ height: 'calc(100vh - 128px)', backgroundColor: '#b4efe1' }}>
    //       <div id='micro-app-container'></div>
    //     </div>
    //   </div>
    //   <Footer style={{ textAlign: 'center' }}>一个随意的footer</Footer>
    // </Layout>
  );
};
export default App;
