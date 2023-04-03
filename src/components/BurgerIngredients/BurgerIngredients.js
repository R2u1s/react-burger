import React from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import BurgerIngredientsGroup from '../BurgerIngredientsGroup/BurgerIngredientsGroup';
import { initialData } from '../../utils/data';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

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

  const [modalActive, setModalActive] = React.useState(false);
  const [modalValues, setIngredientValues] = React.useState({
    image: '',
    name: '',
    calories: '',
    proteins: '',
    fat: '',
    carbohydrates: ''
  });

  function openIngredientPreview(e) {
    const ingredientDOM = e.target.closest('[name="ingredient"]');
    if (ingredientDOM) {
      setIngredientValues(initialData.find((item) => {
        return item._id === ingredientDOM.id;
      }));
      setModalActive(true);
    }
  }
   
  return (
    <>
      <section className={styles['burger-ingredients']}>
        <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
        <Tabs />
        <ul className={styles['burger-ingredients__ingredients']} onClick={openIngredientPreview}>
          <BurgerIngredientsGroup ingredient={{type:"Булки", list: data.buns}} />
          <BurgerIngredientsGroup ingredient={{type:"Соусы", list: data.sauces}}/>
          <BurgerIngredientsGroup ingredient={{type:"Начинка", list: data.mains}}/>
        </ul>
      </section>
      <Modal active={modalActive} setActive={setModalActive}>
        <IngredientDetails ingredientDetails={modalValues} />
      </Modal>
    </>
  );
}

export default BurgerIngredients;