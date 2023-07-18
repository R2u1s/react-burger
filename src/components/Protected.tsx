import { Navigate, useHref } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { getUserRequest, refreshToken, saveLastUrl } from '../services/actions/auth';
import { PATH_LOGIN } from './App/App';

export const Protected: React.FC<{element:React.ReactNode}> = ({ element }) => {
    const dispatch = useDispatch();
    const his = useHref('/');

    const { user } = useSelector((store) => ({
      user: store.auth
    }));

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
        return (user.authRequest || (!user.name && !user.authFailed)) ?
          <p style={{ textAlign: 'center' }}>Загрузка...</p> :
          (user.accessToken ?
            element :
            <Navigate to={PATH_LOGIN} replace />
          );
      },
      [his, user.name, user.authRequest]
    );

    return (
      <>
        {content}
      </>
    );
  }