import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Auth.module.css';
import { useNavigate } from "react-router-dom";
import { resetPassword } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

function AuthResetPassword() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClick() {
    navigate('/login')
  }

  const [valueCode, setValueCode] = React.useState('');
  const inputRefCode = React.useRef(null);

  const [valuePassword, setValuePassword] = React.useState('')
  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  const submitHandler = () => {
    dispatch(resetPassword({valuePassword,valueCode}));
  }

  return (
    <div className={`${styles['auth-container']}`}>
      <div className={`${styles['auth-title']} text text_type_main-medium`}>Восстановление пароля</div>
      <div className={`${styles['auth-inputs']}`}>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={onChangePassword}
          value={valuePassword}
          name={'password'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setValueCode(e.target.value)}
          value={valueCode}
          name={'code'}
          error={false}
          ref={inputRefCode}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className={`${styles['auth-button']}`}>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={submitHandler}>
          Сохранить
        </Button>
      </div>
      <div className={`${styles['auth-extras']}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <span className={`${styles['auth-extra-link']}`} onClick={onClick}> Войти</span>
        </p>
      </div>

    </div>
  );
}

export default AuthResetPassword;