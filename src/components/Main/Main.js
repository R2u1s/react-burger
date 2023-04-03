import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Main.module.css';
import { initialData } from '../../utils/data';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

function Main(){

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
      <main className={`${styles.main}`} onClick={openIngredientPreview}>
        <BurgerIngredients />
        <BurgerConstructor />
        <Modal active={modalActive} setActive={setModalActive}>
          <IngredientDetails ingredientDetails={modalValues} />
        </Modal>
      </main>
    </>
  );
}

export default Main;