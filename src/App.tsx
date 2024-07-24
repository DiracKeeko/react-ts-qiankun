import React, { useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { IUserInfo } from './typings';
import { GlobalContext } from './providers';
import MainContent from './pages';

/**
 * 应用入口文件
 */
const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>();
  const GlobalContextValue = useMemo(
    () => ({
      userInfo,
      setUserInfo,
    }),
    [userInfo],
  );

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ErrorBoundary>
          <GlobalContext.Provider value={GlobalContextValue}>
            <MainContent />
          </GlobalContext.Provider>
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
