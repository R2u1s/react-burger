import React from 'react';
import PropTypes from 'prop-types';
import styles from './Ingredient.module.css';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function Ingredient() {
  return (
    <div className={`${styles['ingredient']}`}>
      <IngredientDetails />
    </div>
  );
}

export default Ingredient;