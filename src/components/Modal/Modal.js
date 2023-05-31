import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById("modal");

const Modal = ({active, setClose, children, clearFunc}) => {

  const navigate = useNavigate();

  function closeHandler() {
    setClose();
    !(window.location.pathname === '/') && navigate(-1);
    clearFunc();
  }

  const escFunction = React.useCallback((event) => {
    if (event.key === "Escape") {
      closeHandler();
    }
  }, []);

  React.useEffect(() => {
    if (active) {
      document.addEventListener("keydown", escFunction)
    } 
    return () => {
      document.removeEventListener("keydown", escFunction)
    };
  }, [active]);

  return ReactDOM.createPortal(
    (
      <ModalOverlay active={active} setClose={setClose} children={children} onClick={setClose} >
      <div className={active ? `${styles.modal__container} ${styles.modal__contVisibility_active}` : `${styles.modal__container}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles['modal__close-button']} onClick={() => {
          closeHandler();
        }}>
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