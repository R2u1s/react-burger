import React from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import BurgerIngredientsGroup from '../BurgerIngredientsGroup/BurgerIngredientsGroup';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { clearIngredientPreview, writeIngredientPreview } from '../../services/actions/burger';
import { useNavigate } from 'react-router-dom';
import { TIngredientsTabs,TIngredientsTabsRef,TIngredientsTabsActive } from '../../types/types';

export const ingredientTypes: TIngredientsTabs = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки"
}

function BurgerIngredients() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = (store) => ({
    ingredientsList: store.burger.ingredientsList,
  });

  const { ingredientsList } = useSelector(getData);

  const { isModalOpen, openModal, closeModal } = useModal();

  const closeModalHandler = () => {
    closeModal();
    !(window.location.pathname === '/') && navigate(-1);
    dispatch(clearIngredientPreview(), '200');
  }

  const filteredData = React.useMemo(
    () => {
      const buns = (Object.values(ingredientsList) as (typeof ingredientsList)[]).filter((item) => item.type === 'bun');
      const sauces = (Object.values(ingredientsList) as (typeof ingredientsList)[]).filter((item) => item.type === 'sauce');
      const mains = (Object.values(ingredientsList) as (typeof ingredientsList)[]).filter((item) => item.type === 'main');
      return { buns, sauces, mains }
    },
    []
  );
  //Состояние отображаемой группы ингредиентов для активации нужного таба по скроллу

  const [scrollTab, setScrollTab] = React.useState<TIngredientsTabsActive>({});
  /////

  //Функция клика по табу. Переход к группе ингредиентов и подсвечивание нужного таба
  //Стэйт реф - ссылка на группу ингредиентов в DOM 
  const [refState, setRefState] = React.useState<TIngredientsTabsRef>({});

  const onClickTab = (tab:keyof typeof refState) => {

    const element = refState[tab];

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setScrollTab(() => {
        (Object.keys(scrollTab) as (keyof typeof scrollTab)[]).forEach((item) => {
          if (item === tab) { scrollTab[item] = true; } else { scrollTab[item] = false; }
        })
        return scrollTab
      });
    }
  }

  React.useEffect(
    () => {
      const index = window.location.pathname.split('/').findIndex((item) => item === 'ingredients');
      if (index) {
        const currentIngredient = ingredientsList[window.location.pathname.split('/')[index + 1]];
        if (currentIngredient) {
          dispatch(writeIngredientPreview(currentIngredient));
          openModal();
        }
      };
    },
    []
  );

  return (
    <>
      <section className={styles['burger-ingredients']}>
        <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
        <Tabs scrollTab={scrollTab} onClickTab={onClickTab} />
        <ul className={styles['burger-ingredients__ingredients']} >
          <BurgerIngredientsGroup
            scrollTab={scrollTab}
            setScrollTab={setScrollTab}
            refState={refState} setRefState={setRefState}
            ingredient={{ type: ingredientTypes.bun, list: filteredData.buns }}
            openModal={openModal} />
          <BurgerIngredientsGroup
            scrollTab={scrollTab}
            setScrollTab={setScrollTab}
            refState={refState}
            setRefState={setRefState}
            ingredient={{ type: ingredientTypes.sauce, list: filteredData.sauces }}
            openModal={openModal} />
          <BurgerIngredientsGroup
            scrollTab={scrollTab}
            setScrollTab={setScrollTab}
            refState={refState}
            setRefState={setRefState}
            ingredient={{ type: ingredientTypes.main, list: filteredData.mains }}
            openModal={openModal} />
        </ul>
      </section>
      <Modal active={isModalOpen} setActive={openModal}
        setClose={closeModalHandler}>
        <IngredientDetails />
      </Modal>
    </>
  );
}

export default BurgerIngredients;