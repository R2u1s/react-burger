import React from 'react';
import AppHeader, { CONSTRUCTOR } from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLogin from '../Auth/AuthLogin';
import AuthReg from '../Auth/AuthReg';
import AuthForgotPassword from '../Auth/AuthForgotPassword';
import AuthResetPassword from '../Auth/AuthResetPassword';
import Profile from '../Profile/Profile';
import { Protected } from '../Protected.js';
import { ProtectedAuthorized } from '../ProtectedAuthorized';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const [active, setActive] = React.useState(CONSTRUCTOR);

  const getUser = (store) => ({
    user: store.auth
  });
  const { user } = useSelector(getUser);

  return (
    <>
      <BrowserRouter>
        <AppHeader active={active} />
        <Routes>
          <Route path="/" element={<Main highlightActive={setActive} />} />
          <Route path="/login" element={<ProtectedAuthorized element={<AuthLogin />}/>} />
          <Route path="/register" element={<ProtectedAuthorized element={<AuthReg />}/>} />
          <Route path="/forgot-password" element={<ProtectedAuthorized element={<AuthForgotPassword />}/>} />
          <Route path="/reset-password" element={
            user.forgotPassword ?
            <ProtectedAuthorized element={<AuthResetPassword />}/> :
            <ProtectedAuthorized element={<AuthForgotPassword />}/>
          } />
          <Route path="/profile" element={<Protected element={<Profile highlightActive={setActive} />} />} />
          {/*           <Route path="*" element={<NotFound404 />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;