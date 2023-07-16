import React from 'react';
import styles from './Profile.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { changeUserInfo } from '../../services/actions/auth';
import { useForm } from '../../hooks/useForm';

const INPUT_NAME = 'name';
const INPUT_EMAIL = 'email';
const INPUT_PASSWORD = 'password';

const ProfileInputs: React.FC = () => {

  const dispatch = useDispatch();

  const { user } = useSelector((store) => ({
    user: store.auth
  }));

  const {values, handleChange, setValues} = useForm({
    [INPUT_NAME]: user.name,
    [INPUT_EMAIL]: user.email,
    [INPUT_PASSWORD]: user.password
  });

  const [isInputChange, setIsInputChange] = React.useState(false);

  const cancelHandler = () => {
    setIsInputChange(false);
    setValues({
      [INPUT_NAME]: user.name,
      [INPUT_EMAIL]: user.email,
      [INPUT_PASSWORD]: user.password
    });
  }

  const saveHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changeUserInfo(values[INPUT_NAME],values[INPUT_EMAIL], values[INPUT_PASSWORD], user.accessToken));
  }

  const classNameToggle = isInputChange ? `${styles['profile-buttons']}` : `${styles['profile-buttons__hidden']}`

  return (
      <form className={`${styles['profile-inputs']} mt-30`} onSubmit={saveHandler}>
        <Input
          type={'text'}
          placeholder={'Name'}
          onChange={e => {
            setIsInputChange(true);
            handleChange(e);
          }}
          icon={'EditIcon'}
          value={values[INPUT_NAME]}
          name={INPUT_NAME}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => {
            setIsInputChange(true);
            handleChange(e);
          }}
          icon={'EditIcon'}
          value={values[INPUT_EMAIL]}
          name={INPUT_EMAIL}
          error={false}
          errorText={'Ошибка'}
          size={'default'}

        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={e => {
            setIsInputChange(true);
            handleChange(e);
          }}
          icon={'EditIcon'}
          value={values[INPUT_PASSWORD]}
          name={INPUT_PASSWORD}
        />
        <div className={classNameToggle}>
          <p className={`${styles['profile-cancel']} text text_type_main-default`} onClick={cancelHandler}>Отмена</p>
          <Button
            htmlType="submit"
            type="primary"
            size="large">
            Сохранить
          </Button>
        </div>
      </form>
  );
}

export default ProfileInputs;