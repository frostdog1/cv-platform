import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '@shared/components/Layout';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
