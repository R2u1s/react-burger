import { Navigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRequest, refreshToken, saveLastUrl } from '../services/actions/auth';

export const ProtectedRouteElementAuthorized = ({ element }) => {

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

  const content = useMemo(
    () => {
      return (user.authRequest) ?
        <p style={{ textAlign: 'center' }}>Загрузка...</p>
        : (
          user.accessToken ? <Navigate to="/profile" replace /> : element
        );
    },
    [user.name, user.authRequest]
  );

  return (
    <>
      {content}
    </>
  );
}
