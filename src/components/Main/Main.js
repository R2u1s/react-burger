import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.module.css';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import ConfigContainer from '../Config/ConfigContainer';
import ConfigEnter from '../Config/ConfigEnter';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function Main() {
  return (
    <main className={`${styles.main}`}>
      <ConfigContainer>
        <ConfigEnter />
      </ConfigContainer>
{/*       <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider> */}
    </main>
  );
}

export default Main;