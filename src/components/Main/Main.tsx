import React from 'react';
import styles from './Main.module.css';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector } from '../../services/hooks';
import { CONSTRUCTOR } from '../AppHeader/AppHeader';

const Main: React.FC<{highlightActive: (value:string) => void}> = ({ highlightActive }) => {

  React.useEffect(() => {
    highlightActive(CONSTRUCTOR);
  }, []);

  const { ingredientsList, ingredientsRequest } = useSelector((store) => ({
    ingredientsList: store.burger.ingredientsList,
    ingredientsRequest: store.burger.ingredientsRequest,
  }));

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

export default Main;