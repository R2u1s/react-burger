import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modalRoot = document.getElementById("modal");

const Modal = (props) => {

  const {active, setActive, children} = props;
  
  const escFunction = React.useCallback((event) => {
    if (event.key === "Escape") {
      setActive(false);
    }
  }, []);

  React.useEffect(() => {
    if (active) {
      document.addEventListener("keydown", escFunction);
    } else {
      document.removeEventListener("keydown", escFunction);
    }
  }, [active]);
  
  return ReactDOM.createPortal(
    (
    <ModalOverlay active={active} setActive={setActive} children={children} onClick={() => setActive(false)}>
      <div className={active ? `${styles.modal__container} ${styles.modal__contVisibility_active}` : `${styles.modal__container}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles['modal__close-button']} onClick={() => setActive(false)}>
          <CloseIcon type="primary" />  
        </button>
        {children}
      </div>  
    </ModalOverlay>
    ), modalRoot
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.object,
  setActive: PropTypes.func
}; 

export default Modal;