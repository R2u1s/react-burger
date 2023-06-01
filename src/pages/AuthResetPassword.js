import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Auth.module.css';
import { useNavigate } from "react-router-dom";
import { resetPassword } from '../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { PATH_LOGIN } from '../components/App/App';
import { useForm } from '../hooks/useForm';

const INPUT_CODE = 'code';
const INPUT_PASSWORD = 'password';

function AuthResetPassword() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClick() {
    navigate(PATH_LOGIN);
  }

  const {values, handleChange} = useForm({
    [INPUT_PASSWORD]: '',
    [INPUT_CODE]: ''
  });

  const submitHandler = React.useCallback(
    e => {
      e.preventDefault();
      dispatch(resetPassword(values[INPUT_PASSWORD], values[INPUT_CODE]));
      navigate(PATH_LOGIN);
    }
  )

  return (
    <form className={`${styles['auth-container']}`} onSubmit={submitHandler}>
      <div className={`${styles['auth-title']} text text_type_main-medium`}>Восстановление пароля</div>
      <div className={`${styles['auth-inputs']}`}>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={handleChange}
          value={values[INPUT_PASSWORD]}
          name={INPUT_PASSWORD}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values[INPUT_CODE]}
          name={INPUT_CODE}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className={`${styles['auth-button']}`}>
        <Button
          htmlType="submit"
          type="primary"
          size="large">
          Сохранить
        </Button>
      </div>
      <div className={`${styles['auth-extras']}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <span className={`${styles['auth-extra-link']}`} onClick={onClick}> Войти</span>
        </p>
      </div>
    </form>
  );
}

export default AuthResetPassword;