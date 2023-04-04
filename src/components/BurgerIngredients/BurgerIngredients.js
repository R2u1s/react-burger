import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import BurgerIngredientsGroup from '../BurgerIngredientsGroup/BurgerIngredientsGroup';

function BurgerIngredients({data}){

  const sortedData = {
    buns: data.filter(function(item) {
      return item.type === 'bun'
    }),
    sauces: data.filter(function(item) {
      return item.type === 'sauce'
    }),
    mains: data.filter(function(item) {
      return item.type === 'main'
    })
  }
   
  return (
    <>
      <section className={styles['burger-ingredients']}>
        <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
        <Tabs />
        <ul className={styles['burger-ingredients__ingredients']} >
          <BurgerIngredientsGroup ingredient={{type:"Булки", list: sortedData.buns}}/>
          <BurgerIngredientsGroup ingredient={{type:"Соусы", list: sortedData.sauces}}/>
          <BurgerIngredientsGroup ingredient={{type:"Начинка", list: sortedData.mains}}/>
        </ul>
      </section>
    </>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}; 

export default BurgerIngredients;