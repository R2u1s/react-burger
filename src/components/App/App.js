import React from 'react';
import AppHeader, { CONSTRUCTOR } from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLogin from '../../pages/AuthLogin';
import AuthReg from '../../pages/AuthReg';
import AuthForgotPassword from '../../pages/AuthForgotPassword';
import AuthResetPassword from '../../pages/AuthResetPassword';
import { Protected } from '../Protected.js';
import { ProtectedAuthorized } from '../ProtectedAuthorized';
import { useSelector } from 'react-redux';
import Ingredient from '../../pages/Ingredient';
import Profile from '../../pages/Profile/Profile';

export const PATH_MAIN = "/";
export const PATH_LOGIN = "/login";
export const PATH_REGISTER = "/register";
export const PATH_FORGOT_PASSWORD = "/forgot-password";
export const PATH_RESET_PASSWORD = "/reset-password";
export const PATH_PROFILE = "/profile";
export const PATH_PROFILE_ORDERS = "/profile/orders";
export const PATH_INGREDIENTS_ID = "/ingredients/:id";

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
          <Route path={PATH_MAIN} element={<Main highlightActive={setActive} />} />
          <Route path={PATH_LOGIN} element={<ProtectedAuthorized element={<AuthLogin />} />} />
          <Route path={PATH_REGISTER} element={<ProtectedAuthorized element={<AuthReg />} />} />
          <Route path={PATH_FORGOT_PASSWORD} element={<ProtectedAuthorized element={<AuthForgotPassword />} />} />
          <Route path={PATH_RESET_PASSWORD} element={
            user.forgotPassword ?
              <ProtectedAuthorized element={<AuthResetPassword />} /> :
              <ProtectedAuthorized element={<AuthForgotPassword />} />
          } />
          <Route path={PATH_PROFILE} element={<Protected element={<Profile highlightActive={setActive} />} />} />
          <Route path={PATH_PROFILE_ORDERS} element={<Protected element={<Profile highlightActive={setActive} />} />} />
          {<Route path={PATH_INGREDIENTS_ID} element={
            user.lastURL === PATH_MAIN ?
              <Main highlightActive={setActive} /> :
              <Ingredient />
          } />}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;