import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { registration } from '../../services/actions/auth';
import styles from './Auth.module.css';

function AuthReg() {

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
    dispatch(registration({valueEmail,valuePassword,valueName}));
  }

  return (
    <div className={`${styles['auth-container']}`}>
      <div className={`${styles['auth-title']} text text_type_main-medium`}>Регистрация</div>
      <div className={`${styles['auth-inputs']}`}>
        <Input
          type={'text'}
          placeholder={'Name'}
          onChange={e => setValueName(e.target.value)}
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
          Зарегистрироваться
        </Button>
      </div>
      <div className={`${styles['auth-extras']}`}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <span className={`${styles['auth-extra-link']}`} onClick={onClick}> Войти</span>
        </p>
      </div>

    </div>
  );
}

export default AuthReg;