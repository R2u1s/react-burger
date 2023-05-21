import React from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { registration } from '../../services/actions/auth';

function Profile() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const submitHandler = () => {
    dispatch(registration({ valueEmail, valuePassword, valueName }));
  }

  return (
    <section className={`${styles['profile']}`}>
      <div className={`${styles['profile-inputs']}`}>
        <Input
          type={'text'}
          placeholder={'Name'}
          onChange={e => setValueName(e.target.value)}
          icon={'EditIcon'}
          value={valueName}
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
          value={valueEmail}
          name={'email'}
          error={false}
          ref={inputRefEmail}
          errorText={'Ошибка'}
          size={'default'}
        />
        <PasswordInput
          onChange={onChangePassword}
          icon={'EditIcon'}
          value={valuePassword}
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
        <li className={`${styles['profile-nav-element']} text text_type_main-medium text_color_inactive`}>
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