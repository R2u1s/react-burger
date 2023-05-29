import React from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import BurgerIngredientsGroup from '../BurgerIngredientsGroup/BurgerIngredientsGroup';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import { useSelector } from 'react-redux';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useLocation, useParams } from 'react-router-dom';

export const ingredientTypes = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки"
}

function BurgerIngredients() {

  const getData = (store) => ({
    ingredientsList: store.burger.ingredientsList,
  })

  const { ingredientsList } = useSelector(getData);

  const { isModalOpen, openModal, closeModal } = useModal();

  const filteredData = React.useMemo(
    () => {
      const buns = Object.values(ingredientsList).filter(function (item) {
        return item.type === 'bun'
      });
      const sauces = Object.values(ingredientsList).filter(function (item) {
        return item.type === 'sauce'
      });
      const mains = Object.values(ingredientsList).filter(function (item) {
        return item.type === 'main'
      });
      return { buns, sauces, mains }
    },
    []
  );

  //Состояние отображаемой группы ингредиентов для активации нужного таба по скроллу
  const [scrollTab, setScrollTab] = React.useState({
    [ingredientTypes.bun]: true,
    [ingredientTypes.sauce]: false,
    [ingredientTypes.main]: false,
  });
  /////

  //Функция клика по табу. Переход к группе ингредиентов и подсвечивание нужного таба
  //Стэйт реф - ссылка на группу ингредиентов в DOM 
  const [refState, setRefState] = React.useState({});

  const onClickTab = (tab) => {
    const element = refState[tab];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setScrollTab((scrollTab) => {
        Object.keys(scrollTab).forEach(item => {
          if (item === tab) { scrollTab[item] = true; } else { scrollTab[item] = false; }
        })
        return scrollTab
      });
    }
  }

  return (
    <>
      <section className={styles['burger-ingredients']}>
        <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
        <Tabs scrollTab={scrollTab} setScrollTab={setScrollTab} onClickTab={onClickTab} />
        <ul className={styles['burger-ingredients__ingredients']} >
          <BurgerIngredientsGroup scrollTab={scrollTab} setScrollTab={setScrollTab} refState={refState} setRefState={setRefState} ingredient={{ type: ingredientTypes.bun, list: filteredData.buns }} openModal={openModal} />
          <BurgerIngredientsGroup scrollTab={scrollTab} setScrollTab={setScrollTab} refState={refState} setRefState={setRefState} ingredient={{ type: ingredientTypes.sauce, list: filteredData.sauces }} openModal={openModal} />
          <BurgerIngredientsGroup scrollTab={scrollTab} setScrollTab={setScrollTab} refState={refState} setRefState={setRefState} ingredient={{ type: ingredientTypes.main, list: filteredData.mains }} openModal={openModal} />
        </ul>
      </section>
      <Modal active={isModalOpen} setActive={openModal} setClose={closeModal}>
        <IngredientDetails />
      </Modal>
    </>
  );
}

export default BurgerIngredients;