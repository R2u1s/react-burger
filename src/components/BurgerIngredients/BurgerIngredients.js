import React from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import BurgerIngredientsGroup from '../BurgerIngredientsGroup/BurgerIngredientsGroup';
import { initialData } from '../../utils/data';

const data = {
  buns: initialData.filter(function(item) {
    return item.type === 'bun'
  }),
  sauces: initialData.filter(function(item) {
    return item.type === 'sauce'
  }),
  mains: initialData.filter(function(item) {
    return item.type === 'main'
  })
}

function BurgerIngredients(){
   
  return (
    <>
      <section className={styles['burger-ingredients']}>
        <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
        <Tabs />
        <ul className={styles['burger-ingredients__ingredients']} >
          <BurgerIngredientsGroup ingredient={{type:"Булки", list: data.buns}} />
          <BurgerIngredientsGroup ingredient={{type:"Соусы", list: data.sauces}}/>
          <BurgerIngredientsGroup ingredient={{type:"Начинка", list: data.mains}}/>
        </ul>
      </section>
    </>
  );
}

export default BurgerIngredients;