import React from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import BurgerIngredientsGroup from '../BurgerIngredientsGroup/BurgerIngredientsGroup';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { IngredientsContext } from '../../services/IngredientsContext';

function BurgerIngredients() {
 
  const { ingredients } = React.useContext(IngredientsContext);

  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalValues, setIngredientValues] = React.useState({
  });

  function openIngredientPreview(ingredient) {
      setIngredientValues(ingredient);
      openModal();
  }

  const filteredData = React.useMemo(
    () => {
      const buns = ingredients.ingredients.filter(function(item) {
        return item.type === 'bun'
      });
      const sauces = ingredients.ingredients.filter(function(item) {
        return item.type === 'sauce'
      });
      const mains = ingredients.ingredients.filter(function(item) {
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
      <Modal active={isModalOpen} setActive={openModal} setClose={closeModal}>
        <IngredientDetails ingredientDetails={modalValues} />
      </Modal>
    </>
  );
}

export default BurgerIngredients;