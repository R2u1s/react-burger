import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import BurgerIngredientsGroup from '../BurgerIngredientsGroup/BurgerIngredientsGroup';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function BurgerIngredients({data}){

  const [modalActive, setModalActive] = React.useState(false);
  const [modalValues, setIngredientValues] = React.useState({
    image: '',
    name: '',
    calories: '',
    proteins: '',
    fat: '',
    carbohydrates: ''
  });

  function openIngredientPreview(ingredient) {
      setIngredientValues(ingredient);
      setModalActive(true);
  }

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
          <BurgerIngredientsGroup ingredient={{type:"Булки", list: sortedData.buns}} openModal={openIngredientPreview}/>
          <BurgerIngredientsGroup ingredient={{type:"Соусы", list: sortedData.sauces}} openModal={openIngredientPreview}/>
          <BurgerIngredientsGroup ingredient={{type:"Начинка", list: sortedData.mains}} openModal={openIngredientPreview}/>
        </ul>
      </section>
      <Modal active={modalActive} setActive={setModalActive}>
        <IngredientDetails ingredientDetails={modalValues} />
      </Modal>
    </>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}; 

export default BurgerIngredients;