import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../services/actions/auth';
import { PATH_MAIN } from './App/App';

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
      user.accessToken ? <Navigate to={PATH_MAIN} replace /> : element
    );

}

ProtectedAuthorized.propTypes = {
  element: PropTypes.object
};
