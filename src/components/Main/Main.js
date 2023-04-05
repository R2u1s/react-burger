import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.module.css';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { ingredientObjectType } from '../../utils/data';

function Main({data}){

  return (
    <>
      <main className={`${styles.main}`}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </main>
    </>
  );
}

Main.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientObjectType))
}; 

export default Main;