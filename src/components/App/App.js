import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLogin from '../Auth/AuthLogin';
import AuthReg from '../Auth/AuthReg';
import AuthRecoverPassword from '../Auth/AuthRecoverPassword';
import AuthNewPassword from '../Auth/AuthNewPassword';

function App() {

  return (
    <>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLogin />} />
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthReg />} />
          <Route path="/forgot-password" element={<AuthRecoverPassword />} />
          <Route path="/reset-password" element={<AuthNewPassword />} />
{/*           <Route path="*" element={<NotFound404 />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;