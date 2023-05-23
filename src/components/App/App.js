import React from 'react';
import AppHeader, { CONSTRUCTOR } from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLogin from '../Auth/AuthLogin';
import AuthReg from '../Auth/AuthReg';
import AuthForgotPassword from '../Auth/AuthForgotPassword';
import AuthResetPassword from '../Auth/AuthResetPassword';
import Profile from '../Profile/Profile';
import { ProtectedRouteElement } from '../Protected-route.js';

function App() {

  const [active, setActive] = React.useState(CONSTRUCTOR);

  return (
    <>
      <BrowserRouter>
        <AppHeader active={active} />
        <Routes>
          <Route path="/" element={<Main highlightActive={setActive} />} />
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthReg />} />
          <Route path="/forgot-password" element={<AuthForgotPassword />} />
          <Route path="/reset-password" element={<AuthResetPassword />} />
          <Route path="/profile" element={<ProtectedRouteElement element={<Profile highlightActive={setActive} />} />} />
          {/*           <Route path="*" element={<NotFound404 />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;