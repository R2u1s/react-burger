import { Navigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRequest } from '../services/actions/auth';

export const ProtectedRouteElement = ({ element }) => {

  const dispatch = useDispatch();

  const getUser = (store) => ({
    user: store.auth
  });
  const { user } = useSelector(getUser);

  useEffect(
    () => {
      dispatch(getUserRequest());
    },
    [dispatch]
  );

  const content = useMemo(
    () => {
      return (user.authRequest || !user.name && !user.authFailed) ? 
        <p style={{textAlign:'center'}}>Загрузка...</p>
       : (
        user.name ? element : <Navigate to="/login" replace />
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
