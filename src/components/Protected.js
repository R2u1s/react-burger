import { Navigate, useHref } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRequest, refreshToken, saveLastUrl } from '../services/actions/auth';
import { PATH_LOGIN } from './App/App';

export const Protected = ({ element }) => {
  const dispatch = useDispatch();
  const his = useHref();

  const getUser = (store) => ({
    user: store.auth
  });
  const { user } = useSelector(getUser);

  useEffect(
    () => {
      dispatch(saveLastUrl(his));
      if (user.accessToken && !user.name) {
        dispatch(getUserRequest(user.accessToken));
      } else {
        if (!user.refreshToken) {
          dispatch(refreshToken());
        }
      }
    },
    [dispatch, user.accessToken]
  );

  const content = useMemo(
    () => {
      return (user.authRequest || (!user.name & !user.authFailed)) ?
        <p style={{ textAlign: 'center' }}>Загрузка...</p> :
        (user.accessToken ?
          element :
          <Navigate to={PATH_LOGIN} replace />
        );
    },
    [his,user.name, user.authRequest]
  );

  return (
    <>
      {content}
    </>
  );
}

Protected.propTypes = {
  element: PropTypes.object
};