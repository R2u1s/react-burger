import React from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { login } from '../../services/actions/auth';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Auth.module.css';
import { Navigate, useNavigate } from "react-router-dom";
import { PATH_FORGOT_PASSWORD, PATH_REGISTER } from '../../components/App/App';
import { useForm } from '../../hooks/useForm';

const INPUT_EMAIL = 'email';
const INPUT_PASSWORD = 'password';

const AuthLogin: React.FC = () => {

  const { user } = useSelector((store) => ({
    user: store.auth
  }));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClickReg() {
    navigate(PATH_REGISTER);
  }

  function onClickRecover() {
    navigate(PATH_FORGOT_PASSWORD);
  }

  const { values, handleChange } = useForm({
    [INPUT_EMAIL]: '',
    [INPUT_PASSWORD]: ''
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(values[INPUT_EMAIL], values[INPUT_PASSWORD]));
  }

  if (user.name) {
    return (
      // Переадресовываем авторизованного пользователя на последнюю страницу
      <Navigate
        to={user.lastURL}
        replace
      />
    );
  }

  return (
    user.name ?
      <Navigate
        to={user.lastURL}
        replace
      /> :
      <form className={`${styles['auth-container']}`} onSubmit={submitHandler} noValidate>
        <h2 className={`${styles['auth-title']} text text_type_main-medium`}>Вход</h2>
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
      </form>
  );
}

export default AuthLogin;