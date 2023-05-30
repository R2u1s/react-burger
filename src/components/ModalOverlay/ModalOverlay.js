import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../services/actions/modal';

const ModalOverlay = (props) => {

  const dispatch = useDispatch();

  const { children } = props;

  const getModal = (store) => ({
    isModalOpen: store.modal.isModalOpen
  });
  const { isModalOpen } = useSelector(getModal);

  return (
    <div className={isModalOpen ? `${styles.modalOverlay} ${styles.modalOverlay__visibility_active}` : `${styles.modalOverlay}`}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.object
};

export default ModalOverlay;