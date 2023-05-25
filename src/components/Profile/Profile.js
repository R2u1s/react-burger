import React from 'react';
import styles from './Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { PROFILE } from '../AppHeader/AppHeader';
import { logout } from '../../services/actions/auth';

function Profile({highlightActive}) {

  React.useEffect(() => {
    highlightActive(PROFILE);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = (store) => ({
    user: store.auth
  });

  const { user } = useSelector(getUser);

  function onClick() {
    navigate('/login')
  }

  const [valueName, setValueName] = React.useState('');
  const inputRefName = React.useRef(null);

  const [valueEmail, setValueEmail] = React.useState('');
  const inputRefEmail = React.useRef(null);

  const [valuePassword, setValuePassword] = React.useState('')
  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  const logoutHandler = () => {
    console.log('click on logout');
    dispatch(logout(user.refreshToken));
  }

  return (
    <section className={`${styles['profile']}`}>
      <div className={`${styles['profile-inputs']}`}>
        <Input
          type={'text'}
          placeholder={'Name'}
          onChange={e => setValueName(e.target.value)}
          icon={'EditIcon'}
          value={user.name}
          name={'name'}
          error={false}
          ref={inputRefName}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => setValueEmail(e.target.value)}
          icon={'EditIcon'}
          value={user.email}
          name={'email'}
          error={false}
          ref={inputRefEmail}
          errorText={'Ошибка'}
          size={'default'}
        />
        <PasswordInput
          onChange={onChangePassword}
          icon={'EditIcon'}
          value={'password'}
          name={'password'}
        />
      </div>
      <ul className={`${styles['profile-nav']}`}>
        <li className={`${styles['profile-nav-element']} text text_type_main-medium`}>
          Профиль
        </li>
        <li className={`${styles['profile-nav-element']} text text_type_main-medium text_color_inactive`}>
          История заказов
        </li>
        <li className={`${styles['profile-nav-element']} text text_type_main-medium text_color_inactive`} onClick={logoutHandler}>
          Выход
        </li>
        <li className={`${styles['profile-nav-element']} text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </li>
      </ul>
    </section>
  );
}

export default Profile;