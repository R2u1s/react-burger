import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';
import { TModal } from '../../types/types';

const ModalOverlay: React.FC<TModal> = ({active, setClose, children}) => {

  return (
    <div className={active ? `${styles.modalOverlay} ${styles.modalOverlay__visibility_active}` : `${styles.modalOverlay}`} onClick={setClose}>
        {children}
    </div>
  );
}

export default ModalOverlay;