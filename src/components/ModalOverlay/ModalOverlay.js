import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './ModalOverlay.module.css';

const ModalOverlay = (props) => {
  
  const {active, setActive, children} = props;

  return (
    <div className={active ? `${styles.modalOverlay} ${styles.modalOverlay__visibility_active}` : `${styles.modalOverlay}`} onClick={() => setActive(false)}>
        {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.object,
  setActive: PropTypes.func
}; 

export default ModalOverlay;