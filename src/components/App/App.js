import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLogin from '../Auth/AuthLogin';
import AuthReg from '../Auth/AuthReg';
import AuthForgotPassword from '../Auth/AuthForgotPassword';
import AuthResetPassword from '../Auth/AuthResetPassword';
import Profile from '../Profile/Profile';

function App() {

  return (
    <>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Profile />} />
{/*           <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthReg />} />
          <Route path="/forgot-password" element={<AuthForgotPassword />} />
          <Route path="/reset-password" element={<AuthResetPassword />} /> */}
{/*           <Route path="*" element={<NotFound404 />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;