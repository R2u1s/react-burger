import React from 'react';
import styles from './BurgerConstructor.module.css';
import ConstructorElementsList from '../ConstructorElementsList/ConstructorElementsList'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector, useDispatch } from 'react-redux';
import { clearIngredientsList, clearIngredientPreview } from '../../services/actions/burger';

function BurgerConstructor() {

  const dispatch = useDispatch();

  const getData = (store) => ({
    selectedIngredients: store.burger.selectedIngredients,
  })

  const { selectedIngredients } = useSelector(getData);

  const { isModalOpen, openModal, closeModal } = useModal();

  const closeModalHandler = () => {
    closeModal();
    dispatch(clearIngredientPreview());
  }

  const [orderRequest,setOrderRequest] = React.useState(false);

  const submitHandler = () => {
    setOrderRequest(true);
    openModal();
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
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => {
            if (selectedIngredients.bun._id && selectedIngredients.otherIngredients.length > 0) {
              submitHandler()}
          }}>
          Оформить заказ
        </Button>
      </div>
       <Modal active={isModalOpen} setActive={openModal} setClose={closeModalHandler}>
        <OrderDetails orderRequest={orderRequest} setOrderRequest={setOrderRequest}/>
      </Modal>
    </section>
  );
}

export default BurgerConstructor;