import React from 'react';
import styles from './Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { PROFILE } from '../AppHeader/AppHeader';
import ProfileInputs from './ProfileInputs';
import { logout, changeUserInfo } from '../../services/actions/auth';
import Orders from '../Orders/Orders';
import TabProfile from './TabProfile';
import { useNavigate } from 'react-router-dom';

function Profile({ highlightActive }) {

  React.useEffect(() => {
    highlightActive(PROFILE);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [active, setActive] = React.useState('profile');
  /*  console.log(window.location.pathname); */

  const getUser = (store) => ({
    user: store.auth
  });

  const { user } = useSelector(getUser);

  const onClickProfile = () => {
    navigate('/profile');
  }

  const onClickOrders = () => {
    navigate('/profile/orders');
  }

  const logoutHandler = () => {
    dispatch(logout(user.refreshToken));
  }

  React.useEffect(
    () => {
      setActive(window.location.pathname.split('/').reverse()[0]);
    },
    [window.location.pathname]
  );

  return (
    <section className={`${styles['profile']}`}>
      {active === 'profile' ? <ProfileInputs /> : <Orders />}
      <ul className={`${styles['profile-nav']}`}>
        <TabProfile active={active === 'profile'} extraclass={'text text_type_main-medium'} text={'Профиль'} onClick={onClickProfile} />
        <TabProfile active={active === 'orders'} extraclass={'text text_type_main-medium'} text={'История заказов'} onClick={onClickOrders} />
        <TabProfile active={false} extraclass={'text text_type_main-medium'} text={'Выход'} onClick={logoutHandler} />
        <TabProfile active={false} extraclass={'text_type_main-default'} text={'В этом разделе вы можете изменить свои персональные данные'} />
      </ul>
    </section>
  );
}

export default Profile;