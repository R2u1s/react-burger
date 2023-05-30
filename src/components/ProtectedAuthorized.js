import { Navigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../services/actions/auth';

export const ProtectedAuthorized = ({ element }) => {

  const dispatch = useDispatch();

  const getUser = (store) => ({
    user: store.auth
  });
  const { user } = useSelector(getUser);

  useEffect(
    () => {
      dispatch(refreshToken());
    },
    [dispatch]
  );

  return (user.authRequest) ?
    <p style={{ textAlign: 'center' }}>Загрузка...</p>
    : (
      user.accessToken ? <Navigate to={user.lastURL} replace /> : element
    );

}
