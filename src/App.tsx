import { useMediaQuery } from '@mui/material';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import Router from './Router';

const App: React.FC = () => {
  const matches = useMediaQuery('(min-width:700px)');

  return (
    <AuthProvider>
      <>
        <Router />
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </>
    </AuthProvider>
  );
};

export default App;
