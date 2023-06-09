import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../components/Feed/Feed.module.css';
import { FEED } from '../../components/AppHeader/AppHeader';
import FeedLenta from '../../components/Feed/FeedLenta';
import FeedInfo from '../../components/Feed/FeedInfo';

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