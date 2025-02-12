import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './components';
import ManageUsers from './components/App/AppLayout/components/ManageUsers';
import History from './pages/History/History';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Plans from './pages/Plans/Plans';
import Register from './pages/Register';

const AppRouter: React.FC = () => {
  const isUserLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        <Route path='/' element={<ProtectedRoutes />}>
          <Route path='home' element={<Home />}></Route>
          <Route path='plans' element={<Plans />}></Route>
          <Route path='history' element={<History />}></Route>
          <Route path='manageuser' element={<ManageUsers />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
