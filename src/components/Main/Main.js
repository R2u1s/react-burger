import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Main.module.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

function Main({data}){

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
      setIngredientValues(data.find((item) => {
        return item._id === ingredientDOM.id;
      }));
      setModalActive(true);
    }
  }

  return (
    <>
      <main className={`${styles.main}`} onClick={openIngredientPreview}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
        <Modal active={modalActive} setActive={setModalActive}>
          <IngredientDetails ingredientDetails={modalValues} />
        </Modal>
      </main>
    </>
  );
}

export default Main;