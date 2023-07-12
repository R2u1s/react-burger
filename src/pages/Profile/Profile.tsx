import React from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { PROFILE } from '../../components/AppHeader/AppHeader';
import ProfileInputs from './ProfileInputs';
import { logout } from '../../services/actions/auth';
import Orders from '../../components/Orders/Orders';
import TabProfile from './TabProfile';
import { useNavigate } from 'react-router-dom';
import { PATH_PROFILE, PATH_PROFILE_ORDERS } from '../../components/App/App';

const Profile: React.FC<{highlightActive: (value:string) => void}> = ({ highlightActive }) => {

  React.useEffect(() => {
    highlightActive(PROFILE);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [active, setActive] = React.useState<string>('profile');
  /*  console.log(window.location.pathname); */

  const getUser = (store) => ({
    user: store.auth
  });

  const { user } = useSelector(getUser);

  const onClickProfile = () => {
    navigate(PATH_PROFILE);
  }

  const onClickOrders = () => {
    navigate(PATH_PROFILE_ORDERS);
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
      <ul className={`${styles['profile-nav']} mt-30`}>
        <TabProfile active={active === 'profile'} extraclass={'text text_type_main-medium'} text={'Профиль'} onClick={onClickProfile} />
        <TabProfile active={active === 'orders'} extraclass={'text text_type_main-medium'} text={'История заказов'} onClick={onClickOrders} />
        <TabProfile active={false} extraclass={'text text_type_main-medium'} text={'Выход'} onClick={logoutHandler} />
        <TabProfile active={false} extraclass={'text_type_main-default'} text={'В этом разделе вы можете изменить свои персональные данные'} onClick={()=>{}}/>
      </ul>
      {active === 'profile' ? <ProfileInputs /> : <Orders />}
    </section>
  );
}

export default Profile;