import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.module.css';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

function Main() {
  return (
    <>
      <main className={`${styles.main}`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default Main;