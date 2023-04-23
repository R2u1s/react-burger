import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

const ModalOverlay = (props) => {
  
  const {active, setClose, children} = props;

  return (
    <div className={active ? `${styles.modalOverlay} ${styles.modalOverlay__visibility_active}` : `${styles.modalOverlay}`} onClick={setClose}>
        {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.object,
  setClose: PropTypes.func
}; 

export default ModalOverlay;