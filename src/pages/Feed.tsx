import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components/Feed/Feed.module.css';
import { FEED } from '../components/AppHeader/AppHeader';
import FeedLenta from '../components/Feed/FeedLenta';
import FeedInfo from '../components/Feed/FeedInfo';
import { useSelector,useDispatch } from 'react-redux';
import { wsGetOrders, wsConnectionClosed, WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/actions/wsActions';

const Feed: React.FC<{highlightActive: (value:string) => void}> = ({ highlightActive }) => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    highlightActive(FEED);
  }, []);

  const getData = (store) => ({
    ingredientsList: store.burger.ingredientsList,
    ingredientsRequest: store.burger.ingredientsRequest
  });
  const { ingredientsList,ingredientsRequest } = useSelector(getData);

  const getWs = (store) => ({
    wsConnectedAll: store.wsOrders.wsConnectedAll,
    orders: store.wsOrders.orders
  })
  const {wsConnectedAll,orders} = useSelector(getWs);

  React.useEffect(
    () => {
        if (wsConnectedAll) {
          dispatch(wsGetOrders);
        } else {
          dispatch({ type: WS_CONNECTION_START });
        }

        return () => {
          dispatch({ type: WS_CONNECTION_CLOSED });
        }
    },
    []
  );

  const content = React.useMemo(
    () => {
      return (ingredientsRequest || JSON.stringify(ingredientsList) === '{}' || !wsConnectedAll) ? (
        "Загрузка"
      ) : (
        <>
          <FeedLenta />
          <FeedInfo />
        </>
      );
    },
    [ingredientsRequest, ingredientsList,wsConnectedAll,orders]
  );

  return (
    <main className={`${styles.feed}`}>
      {content}
    </main>
  );
}

export default Feed;