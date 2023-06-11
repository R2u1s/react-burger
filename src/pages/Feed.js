import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components/Feed/Feed.module.css';
import { FEED } from '../components/AppHeader/AppHeader';
import FeedLenta from '../components/Feed/FeedLenta';
import FeedInfo from '../components/Feed/FeedInfo';
import { useSelector } from 'react-redux';

function Feed({ highlightActive }) {

  React.useEffect(() => {
    highlightActive(FEED);
  }, []);

  const getData = (store) => ({
    ingredientsList: store.burger.ingredientsList,
    ingredientsRequest: store.burger.ingredientsRequest
  });
  const { ingredientsList,ingredientsRequest } = useSelector(getData);

  const getWs = (store) => ({
    wsConnected: store.wsOrders.wsConnected,
    orders: store.wsOrders.orders
  })
  const {wsConnected,orders} = useSelector(getWs);

  const content = React.useMemo(
    () => {
      return (ingredientsRequest || JSON.stringify(ingredientsList) === '{}' || !wsConnected) ? (
        "Загрузка"
      ) : (
        <>
          <FeedLenta />
          <FeedInfo />
        </>
      );
    },
    [ingredientsRequest, ingredientsList,wsConnected,orders]
  );

  return (
    <main className={`${styles.feed}`}>
      {content}
    </main>
  );
}

Feed.propTypes = {
  highlightActive: PropTypes.func
};

export default Feed;