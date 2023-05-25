import { Navigate, useHref } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRequest, refreshToken,saveLastUrl } from '../services/actions/auth';

export const ProtectedRouteElement = ({ element }) => {

  const dispatch = useDispatch();
  const his = useHref();

  const getUser = (store) => ({
    user: store.auth
  });
  const { user } = useSelector(getUser);

  useEffect(
    () => {
      dispatch(saveLastUrl(his));
      if (user.accessToken) {
        dispatch(getUserRequest(user.accessToken));
      } else {
          dispatch(refreshToken());
      }
      
    },
    [dispatch,user.name,user.accessToken]
  );

  const content = useMemo(
    () => {
      return (user.authRequest || !user.name && !user.authFailed) ? 
        <p style={{textAlign:'center'}}>Загрузка...</p>
       : (
        user.accessToken ? element : <Navigate to="/login" replace />
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
