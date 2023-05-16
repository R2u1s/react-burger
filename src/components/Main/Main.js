import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.module.css';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import AuthEnter from '../Auth/AuthEnter';
import AuthReg from '../Auth/AuthReg';
import AuthRecoverPassword from '../Auth/AuthRecoverPassword';
import AuthNewPassword from '../Auth/AuthNewPassword';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function Main() {
  return (
    <main className={`${styles.main}`}>
        <AuthNewPassword />
{/*       <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider> */}
    </main>
  );
}

export default Main;