import React from 'react';
import styles from '../components/Feed/Feed.module.css';
import { FEED } from '../components/AppHeader/AppHeader';
import FeedLenta from '../components/Feed/FeedLenta';
import FeedInfo from '../components/Feed/FeedInfo';
import { useSelector, useDispatch } from '../services/hooks';
import { wsGetOrders, WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/actions/wsActions';

const Feed: React.FC<{highlightActive: (value:string) => void}> = ({ highlightActive }) => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    highlightActive(FEED);
  }, []);

  const { ingredientsList,ingredientsRequest } = useSelector((store) => ({
    ingredientsList: store.burger.ingredientsList,
    ingredientsRequest: store.burger.ingredientsRequest
  }));

  const {wsConnectedAll,orders} = useSelector((store) => ({
    wsConnectedAll: store.wsOrders.wsConnectedAll,
    orders: store.wsOrders.orders
  }));

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