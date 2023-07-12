import React from 'react';
import { FC } from 'react';
import AppHeader, { CONSTRUCTOR } from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthLogin from '../../pages/Auth/AuthLogin';
import AuthReg from '../../pages/Auth/AuthReg';
import AuthForgotPassword from '../../pages/Auth/AuthForgotPassword';
import AuthResetPassword from '../../pages/Auth/AuthResetPassword';
import { Protected } from '../Protected';
import { ProtectedAuthorized } from '../ProtectedAuthorized';
import { useSelector, useDispatch } from 'react-redux';
import Ingredient from '../../pages/Ingredient/Ingredient';
import Profile from '../../pages/Profile/Profile';
import { getIngredients } from '../../services/actions/burger';
import { saveLastUrl } from '../../services/actions/auth';
import Feed from '../../pages/Feed';
import Order from '../../pages/Order/Order';

/* export const PATH_MAIN = "/react-burger/";
export const PATH_LOGIN = "/react-burger/login";
export const PATH_REGISTER = "/react-burger/register";
export const PATH_FORGOT_PASSWORD = "/react-burger/forgot-password";
export const PATH_RESET_PASSWORD = "/react-burger/reset-password";
export const PATH_PROFILE = "/react-burger/profile";
export const PATH_PROFILE_ORDERS = "/react-burger/profile/orders";
export const PATH_PROFILE_ORDERS_ID = "/react-burger/profile/orders/:id";
export const PATH_INGREDIENTS_ID = "/react-burger/ingredients/:id";
export const PATH_FEED = "/react-burger/feed";
export const PATH_FEED_ID = "/react-burger/feed/:id"; */

export const PATH_MAIN = "/";
export const PATH_LOGIN = "/login";
export const PATH_REGISTER = "/register";
export const PATH_FORGOT_PASSWORD = "/forgot-password";
export const PATH_RESET_PASSWORD = "/reset-password";
export const PATH_PROFILE = "/profile";
export const PATH_PROFILE_ORDERS = "/profile/orders";
export const PATH_PROFILE_ORDERS_ID = "/profile/orders/:id";
export const PATH_INGREDIENTS_ID = "/ingredients/:id";
export const PATH_FEED = "/feed";
export const PATH_FEED_ID = "/feed/:id";

const App: FC = () => {

  const [active, setActive] = React.useState<string>(CONSTRUCTOR);

  const location = useLocation();

  const dispatch = useDispatch();

  const getUser = (store) => ({
    user: store.auth
  });

  const { user } = useSelector(getUser);

  React.useEffect(
    () => {
      dispatch(getIngredients());
      dispatch(saveLastUrl(window.location.pathname));
    },
    [dispatch]
  );

  const background = location.state?.background;

  return (
    <>
      <AppHeader active={active} />
      <Routes location={background || location}>
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
        {background && <Route path={PATH_INGREDIENTS_ID} element={<Main highlightActive={setActive} />} />}
        <Route path={PATH_INGREDIENTS_ID} element={<Ingredient />} />
        <Route path={PATH_FEED} element={<Feed highlightActive={setActive} />} />
        <Route path={PATH_FEED_ID} element={<Order highlightActive={setActive} />} />
        <Route path={PATH_PROFILE_ORDERS_ID} element={<Protected element={<Order highlightActive={setActive} />} />} />
      </Routes>
    </>
  );
}

export default App;