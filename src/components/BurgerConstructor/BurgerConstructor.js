import React from 'react';
import ReactDOM from 'react-dom';
import styles from './BurgerConstructor.module.css';
import ConstructorElementsList from '../ConstructorElementsList/ConstructorElementsList'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { initialData } from '../../utils/data';

function BurgerConstructor(){
  return (
    <section className={`${styles['burger-constructor']} pt-15`}>
      <ConstructorElementsList ingredients={{list:initialData}} />
      <div className={`${styles['burger-constructor__overall-flex']}`}>
        <div className={`${styles['burger-constructor__price']}`}>
          <p className="text text_type_digits-medium">300</p>
          <div className={`${styles['burger-constructor__currency-icon']}`}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;