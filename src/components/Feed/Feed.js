import React from 'react';
import PropTypes from 'prop-types';
import styles from './Feed.module.css';
import { FEED } from '../AppHeader/AppHeader';
import FeedLenta from './FeedLenta';
import FeedInfo from './FeedInfo';

function Feed({ highlightActive }) {

  React.useEffect(() => {
    highlightActive(FEED);
  }, []);

  const content = React.useMemo(
    () => {
      return false ? (
        "Загрузка"
      ) : (
        <>
          <FeedLenta />
          <FeedInfo />
        </>
      );
    },
    []
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