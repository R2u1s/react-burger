import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modal");

const Modal = (props) => {

  const {active, setActive, children} = props;
  
  const escFunction = React.useCallback((event) => {
    if (event.key === "Escape") {
      setActive(false);
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);
  
  return ReactDOM.createPortal(
    (
    <div className={active ? `${styles.modalOverlay} ${styles.modal__visibility_active}` : `${styles.modalOverlay}`} onClick={() => setActive(false)}>
      <div className={active ? `${styles.modal__container} ${styles.modal__contVisibility_active}` : `${styles.modal__container}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles['modal__close-button']} onClick={() => setActive(false)}>
          <CloseIcon type="primary" />  
        </button>
        {children}
      </div>  
    </div>
    ), modalRoot
  );
}

export default Modal;