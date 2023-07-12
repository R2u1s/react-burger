import React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Auth.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { forgotPassword, postEmail } from '../../services/actions/auth';
import { PATH_LOGIN, PATH_RESET_PASSWORD } from '../../components/App/App';
import { useForm } from '../../hooks/useForm';

const INPUT_EMAIL = 'email';

const AuthForgotPassword: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClickLoginPage() {
    navigate(PATH_LOGIN)
  }

  const {values, handleChange} = useForm({
    [INPUT_EMAIL]: '',
  });


  const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(postEmail(values[INPUT_EMAIL]));
      dispatch(forgotPassword());
      navigate(PATH_RESET_PASSWORD);
    }

  return (
    <form className={`${styles['auth-container']}`} onSubmit={submitHandler} noValidate>
      <h2 className={`${styles['auth-title']} text text_type_main-medium`}>Восстановление пароля</h2>
      <div className={`${styles['auth-inputs']}`}>
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
      </div>
      <div className={`${styles['auth-button']}`}>
        <Button
          htmlType="submit"
          type="primary"
          size="large">
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