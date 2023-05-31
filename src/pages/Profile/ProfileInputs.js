import React from 'react';
import styles from './Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { changeUserInfo } from '../../services/actions/auth';

function ProfileInputs() {

  const dispatch = useDispatch();

  const getUser = (store) => ({
    user: store.auth
  });

  const { user } = useSelector(getUser);

  const [valueName, setValueName] = React.useState('');
  const inputRefName = React.useRef(null);

  const [valueEmail, setValueEmail] = React.useState('');
  const inputRefEmail = React.useRef(null);

  const [valuePassword, setValuePassword] = React.useState('')

  const [isInputChange, setIsInputChange] = React.useState(false);


  React.useEffect(
    () => {
      setValueName(user.name);
      setValueEmail(user.email);
      setValuePassword(user.password);
    },
    []
  );

  const cancelHandler = () => {
    setIsInputChange(false);
    setValueName(user.name);
    setValueEmail(user.email);
    setValuePassword(user.password);
  }

  const saveHandler = () => {
    dispatch(changeUserInfo({ valueName, valueEmail, valuePassword }, user.accessToken));
  }

  const classNameToggle = isInputChange ? `${styles['profile-buttons']}` : `${styles['profile-buttons', 'profile-buttons__active']}`

  return (
      <div className={`${styles['profile-inputs']}`}>
        <Input
          type={'text'}
          placeholder={'Name'}
          onChange={e => {
            setIsInputChange(true);
            setValueName(e.target.value);
          }}
          icon={'EditIcon'}
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
          onChange={e => {
            setIsInputChange(true);
            setValueEmail(e.target.value);
          }}
          icon={'EditIcon'}
          value={valueEmail}
          name={'email'}
          error={false}
          ref={inputRefEmail}
          errorText={'Ошибка'}
          size={'default'}

        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={e => {
            setIsInputChange(true);
            setValuePassword(e.target.value);
          }}
          icon={'EditIcon'}
          value={valuePassword}
          name={'password'}
        />
        <div className={classNameToggle}>
          <p className={`${styles['profile-cancel']} text text_type_main-default`} onClick={cancelHandler}>Отмена</p>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={saveHandler}>
            Сохранить
          </Button>
        </div>
      </div>
  );
}

export default ProfileInputs;