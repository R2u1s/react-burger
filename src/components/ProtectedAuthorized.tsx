import { Navigate } from 'react-router-dom';
import { useEffect,useMemo } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { refreshToken } from '../services/actions/auth';
import { PATH_MAIN } from './App/App';

export const ProtectedAuthorized: React.FC<{element:React.ReactNode}> = ({ element }) => {

  const dispatch = useDispatch();

  const { user } = useSelector((store) => ({
    user: store.auth
  }));

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
        user.accessToken ? <Navigate to={PATH_MAIN} replace /> : element
      );
    },
    [user.authRequest]
  );

  return (
    <>
    {content}
  </>
  ); 
}