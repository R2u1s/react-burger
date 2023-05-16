import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Auth.module.css';

function AuthRecoverPassword() {

  const [valueEmail, setValueEmail] = React.useState('');
  const inputRefEmail = React.useRef(null);

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
          onClick={() => { }}>
          Воcстановить
        </Button>
      </div>
      <div className={`${styles['auth-extras']}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <span className={`${styles['auth-extra-link']}`}> Войти</span>
        </p>
      </div>

    </div>
  );
}

export default AuthRecoverPassword;