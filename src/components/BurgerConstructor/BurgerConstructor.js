import React from 'react';
import styles from './BurgerConstructor.module.css';
import ConstructorElementsList from '../ConstructorElementsList/ConstructorElementsList'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector,useDispatch } from 'react-redux';
import { postOrder } from '../../services/actions/burger';

function BurgerConstructor() {

  const dispatch = useDispatch();

  const { selectedIngredients } = useSelector(store => ({
    selectedIngredients: store.burger.selectedIngredients,
  }));

  const { isModalOpen, openModal, closeModal } = useModal();

  function collectId() {
    let arrayOfId = [];
    arrayOfId.push(selectedIngredients.bun._id);
    arrayOfId.push(selectedIngredients.bun._id);
    selectedIngredients.otherIngredients.forEach(item => arrayOfId.push(item._id));
    return arrayOfId;
  }

  const submitHandler = () => {
    openModal();
    dispatch(postOrder(collectId()));
  }

  return (
    <section className={`${styles['burger-constructor']} pt-15`}>
      <ConstructorElementsList className={'mb-10'} />
      <div className={`${styles['burger-constructor__overall-flex']}`}>
        <div className={`${styles['burger-constructor__price']}`}>
          <p className="text text_type_digits-medium">{selectedIngredients.totalPrice}</p>
          <div className={`${styles['burger-constructor__currency-icon']}`}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={submitHandler}>Оформить заказ</Button>
      </div>
      <Modal active={isModalOpen} setActive={openModal} setClose={closeModal}>
        <OrderDetails />
      </Modal>
    </section>
  );
}

export default BurgerConstructor;