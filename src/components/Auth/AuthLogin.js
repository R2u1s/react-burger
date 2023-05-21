import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../services/actions/auth';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Auth.module.css';
import { useNavigate } from "react-router-dom";

function AuthLogin() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClickReg() {
    navigate('/register')
  }

  function onClickRecover() {
    navigate('/forgot-password')
  }

  const [valueEmail, setValueEmail] = React.useState('');
  const inputRefEmail = React.useRef(null);

  const [valuePassword, setValuePassword] = React.useState('')
  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  const submitHandler = () => {
    dispatch(login({valueEmail,valuePassword}));
  }

  return (
    <div className={`${styles['auth-container']}`}>
      <div className={`${styles['auth-title']} text text_type_main-medium`}>Вход</div>
      <div className={`${styles['auth-inputs']}`}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => setValueEmail(e.target.value)}
          value={valueEmail}
          name={'email'}
          error={false}
          ref={inputRefEmail}
          errorText={'Ошибка'}
          size={'default'}
        />
        <PasswordInput
          onChange={onChangePassword}
          value={valuePassword}
          name={'password'}
        />
      </div>
      <div className={`${styles['auth-button']}`}>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={submitHandler}>
          Войти
        </Button>
      </div>
      <div className={`${styles['auth-extras']}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь?
          <span className={`${styles['auth-extra-link']}`} onClick={onClickReg}> Зарегистрироваться</span>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <span className={`${styles['auth-extra-link']}`} onClick={onClickRecover}> Восстановить пароль</span>
        </p>
      </div>

    </div>
  );
}

export default AuthLogin;