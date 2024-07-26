import React from 'react';
import styles from './index.less';
import Logo from '@assets/logo-react.svg';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => (
  <div className={styles.container}>
    <img src={Logo} alt='react' />
    <h1>React App</h1>
  </div>
);
export default Home;
