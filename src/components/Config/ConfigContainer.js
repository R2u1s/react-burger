import React from 'react';
import PropTypes from 'prop-types';
import styles from './Config.module.css';

function ConfigContainer({children}) {
  return (
    <div className={`${styles['config-container']}`}>
      {children}
    </div>
  );
}

export default ConfigContainer;