import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.module.css';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector } from 'react-redux';
import { CONSTRUCTOR } from '../AppHeader/AppHeader';

function Main({ highlightActive }) {

  React.useEffect(() => {
    highlightActive(CONSTRUCTOR);
  }, []);

  const getData = (store) => ({
    ingredientsList: store.burger.ingredientsList,
    ingredientsRequest: store.burger.ingredientsRequest,
  })

  const { ingredientsList, ingredientsRequest } = useSelector(getData);

  const content = React.useMemo(
    () => {
      return ingredientsRequest ? (
        "Загрузка"
      ) : (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
      );
    },
    [ingredientsRequest, ingredientsList]
  );

  return (
    <main className={`${styles.main}`}>
      {content}
    </main>
  );
}

Main.propTypes = {
  highlightActive: PropTypes.func
};

export default Main;