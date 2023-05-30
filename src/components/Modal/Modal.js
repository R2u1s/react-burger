import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../services/actions/modal';
import { useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById("modal");

const Modal = ({clearFunc, children}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getModal = (store) => ({
    isModalOpen: store.modal.isModalOpen
  });
  const { isModalOpen } = useSelector(getModal);

  function closeHandler() {
    dispatch(closeModal());
    navigate(-1);
    clearFunc();
  }

  const escFunction = React.useCallback((event) => {
    if (event.key === "Escape") {
      closeHandler();
    }
  }, []);

  React.useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("keydown", escFunction)
    }
    return () => {
      document.removeEventListener("keydown", escFunction)
    };
  }, [isModalOpen]);

  return ReactDOM.createPortal(
    (
      <ModalOverlay children={children} >
        <div className={isModalOpen ? `${styles.modal__container} ${styles.modal__contVisibility_active}` : `${styles.modal__container}`} onClick={(e) => e.stopPropagation()}>
          <button className={styles['modal__close-button']} onClick={closeHandler}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </ModalOverlay>
    ), modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.object
};

export default Modal;