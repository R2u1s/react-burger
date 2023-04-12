import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import BurgerIngredientsGroup from '../BurgerIngredientsGroup/BurgerIngredientsGroup';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { ingredientObjectType } from '../../utils/data';
import { DataContext } from '../../services/dataContext';

function BurgerIngredients() {
 
  const {Data, setIngredients} = React.useContext(DataContext);

  const [modalActive, setModalActive] = React.useState(false);
  const [modalValues, setIngredientValues] = React.useState({
  });

  function openIngredientPreview(ingredient) {
      setIngredientValues(ingredient);
      setModalActive(true);
  }

  const filteredData = React.useMemo(
    () => {
      const buns = Data.ingredients.filter(function(item) {
        return item.type === 'bun'
      });
      const sauces = Data.ingredients.filter(function(item) {
        return item.type === 'sauce'
      });
      const mains = Data.ingredients.filter(function(item) {
        return item.type === 'main'
      });
      return {buns,sauces,mains}
    },
    [modalValues]
  );
   
  return (
    <>
      <section className={styles['burger-ingredients']}>
        <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
        <Tabs />
        <ul className={styles['burger-ingredients__ingredients']} >
          <BurgerIngredientsGroup ingredient={{type:"Булки", list: filteredData.buns}} openModal={openIngredientPreview}/>
          <BurgerIngredientsGroup ingredient={{type:"Соусы", list: filteredData.sauces}} openModal={openIngredientPreview}/>
          <BurgerIngredientsGroup ingredient={{type:"Начинка", list: filteredData.mains}} openModal={openIngredientPreview}/>
        </ul>
      </section>
      <Modal active={modalActive} setActive={setModalActive}>
        <IngredientDetails ingredientDetails={modalValues} />
      </Modal>
    </>
  );
}

export default BurgerIngredients;