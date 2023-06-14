import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { registration } from '../services/actions/auth';
import styles from './Auth.module.css';
import { PATH_LOGIN } from '../components/App/App';
import { useForm } from '../hooks/useForm';

const INPUT_NAME = 'name';
const INPUT_EMAIL = 'email';
const INPUT_PASSWORD = 'password';

function AuthReg() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClick() {
    navigate(PATH_LOGIN);
  }
  
  const {values, handleChange} = useForm({
    [INPUT_NAME]: '',
    [INPUT_EMAIL]: '',
    [INPUT_PASSWORD]: ''
  });

  const submitHandler = React.useCallback(
    e => {
      e.preventDefault();
      dispatch(registration(values[INPUT_NAME],values[INPUT_EMAIL],values[INPUT_PASSWORD]));
    }
  )

  return (
    <form className={`${styles['auth-container']}`} onSubmit={submitHandler} noValidate>
      <h2 className={`${styles['auth-title']} text text_type_main-medium`}>Регистрация</h2>
      <div className={`${styles['auth-inputs']}`}>
        <Input
          type={'text'}
          placeholder={'Name'}
          onChange={handleChange}
          value={values[INPUT_NAME]}
          name={INPUT_NAME}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleChange}
          value={values[INPUT_EMAIL]}
          name={INPUT_EMAIL}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <PasswordInput
          onChange={handleChange}
          value={values[INPUT_PASSWORD]}
          name={INPUT_PASSWORD}
        />
      </div>
      <div className={`${styles['auth-button']}`}>
        <Button
          htmlType="submit"
          type="primary"
          size="large">
          Зарегистрироваться
        </Button>
      </div>
      <div className={`${styles['auth-extras']}`}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <span className={`${styles['auth-extra-link']}`} onClick={onClick}> Войти</span>
        </p>
      </div>

    </form>
  );
}

export default AuthReg;