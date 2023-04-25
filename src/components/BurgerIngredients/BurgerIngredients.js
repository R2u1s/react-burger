import React from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import BurgerIngredientsGroup from '../BurgerIngredientsGroup/BurgerIngredientsGroup';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { IngredientsContext } from '../../services/IngredientsContext';

export const ingredientTypes = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки"
}

function BurgerIngredients() {
 
  const { ingredients } = React.useContext(IngredientsContext);

  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalValues, setIngredientValues] = React.useState({});

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

  //Состояние отображаемой группы ингредиентов для активации нужного таба по скроллу
  const [handleTab, setHandleTab] = React.useState({
    [ingredientTypes.bun]: true,
    [ingredientTypes.sauce]: false,
    [ingredientTypes.main]: false,
  });
  /////

  return (
    <>
      <section className={styles['burger-ingredients']}>
        <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
        <Tabs handleTab={handleTab}/>
        <ul className={styles['burger-ingredients__ingredients']} >
          <BurgerIngredientsGroup handleTab={handleTab} setHandleTab={setHandleTab} ingredient={{type:ingredientTypes.bun, list: filteredData.buns}} openModal={openIngredientPreview}/>
          <BurgerIngredientsGroup handleTab={handleTab} setHandleTab={setHandleTab} ingredient={{type:ingredientTypes.sauce, list: filteredData.sauces}} openModal={openIngredientPreview}/>
          <BurgerIngredientsGroup handleTab={handleTab} setHandleTab={setHandleTab} ingredient={{type:ingredientTypes.main, list: filteredData.mains}} openModal={openIngredientPreview}/>
        </ul>
      </section>
      <Modal active={isModalOpen} setActive={openModal} setClose={closeModal}>
        <IngredientDetails ingredientDetails={modalValues} />
      </Modal>
    </>
  );
}

export default BurgerIngredients;