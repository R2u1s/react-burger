import React from 'react';
import ReactDOM from 'react-dom';
import styles from './BurgerConstructor.module.css';
import Components from '../Components/Components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(){
  return (
    <section className={`${styles['burger-constructor']} pt-15`}>
      <Components />
      <div className={`${styles['burger-constructor__overall-flex']}`}>
        <div className={`${styles['burger-constructor__price']}`}>
        <p className="text text_type_digits-medium">300</p>
          <CurrencyIcon style={{ width: '36px', height: '36px' }} type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;