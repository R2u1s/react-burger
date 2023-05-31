import React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Auth.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { forgotPassword, postEmail } from '../services/actions/auth';
import { PATH_LOGIN, PATH_RESET_PASSWORD } from '../components/App/App';

function AuthForgotPassword() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClickLoginPage() {
    navigate(PATH_LOGIN)
  }

  const [valueEmail, setValueEmail] = React.useState('');
  const inputRefEmail = React.useRef(null);

  const submitHandler = React.useCallback(
    e => {
      e.preventDefault();
      dispatch(postEmail(valueEmail));
      dispatch(forgotPassword());
      navigate(PATH_RESET_PASSWORD);
    }
  )

  return (
    <form className={`${styles['auth-container']}`} noValidate>
      <h2 className={`${styles['auth-title']} text text_type_main-medium`}>Восстановление пароля</h2>
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
          htmlType="submit"
          type="primary"
          size="large"
          onClick={submitHandler}>
          Воcстановить
        </Button>
      </div>
      <div className={`${styles['auth-extras']}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <span className={`${styles['auth-extra-link']}`} onClick={onClickLoginPage}> Войти</span>
        </p>
      </div>
    </form>
  );
}

export default AuthForgotPassword;