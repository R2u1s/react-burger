import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Auth.module.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword, postEmail } from '../../services/actions/auth';

function AuthForgotPassword() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClickLoginPage() {
    navigate('/login')
  }

  const [valueEmail, setValueEmail] = React.useState('');
  const inputRefEmail = React.useRef(null);

  function onClickRecover() {
    dispatch(postEmail(valueEmail));
    dispatch(forgotPassword());
    navigate('/reset-password');
  }

  return (
    <div className={`${styles['auth-container']}`}>
      <div className={`${styles['auth-title']} text text_type_main-medium`}>Восстановление пароля</div>
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
      </div>
      <div className={`${styles['auth-button']}`}>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={onClickRecover}>
          Воcстановить
        </Button>
      </div>
      <div className={`${styles['auth-extras']}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <span className={`${styles['auth-extra-link']}`} onClick={onClickLoginPage}> Войти</span>
        </p>
      </div>
    </div>
  );
}

export default AuthForgotPassword;