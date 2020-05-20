import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import ShimmerStyle from './styles/shimmer';

import Routes from './routes';

import { AppProvider } from './contexts/AppContext';

const App: FC = () => (
  <>
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
    <ShimmerStyle />
    <GlobalStyle />
  </>
);

export default App;
