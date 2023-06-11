import React from 'react';
import AppHeader, { CONSTRUCTOR } from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthLogin from '../../pages/AuthLogin';
import AuthReg from '../../pages/AuthReg';
import AuthForgotPassword from '../../pages/AuthForgotPassword';
import AuthResetPassword from '../../pages/AuthResetPassword';
import { Protected } from '../Protected.js';
import { ProtectedAuthorized } from '../ProtectedAuthorized';
import { useSelector, useDispatch } from 'react-redux';
import Ingredient from '../../pages/Ingredient';
import Profile from '../../pages/Profile/Profile';
import { getIngredients } from '../../services/actions/burger';
import { saveLastUrl } from '../../services/actions/auth';
import Feed from '../../pages/Feed';
import Order from '../../pages/Order/Order';
import { wsGetOrders } from '../../services/actions/wsActions';
import { WS_CONNECTION_START } from '../../services/actions/wsActions';

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

function App() {

  const location = useLocation();

  const [active, setActive] = React.useState(CONSTRUCTOR);

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

  const getWs = (store) => ({
    wsConnected: store.wsOrders.wsConnected,
  })
  const { wsConnected } = useSelector(getWs);

  React.useEffect(
    () => {
      if (wsConnected) {
        dispatch(wsGetOrders);
      } else {
        dispatch({ type: WS_CONNECTION_START });
      }
    },
    [wsConnected]
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