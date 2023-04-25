import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './BurgerIngredientsGroup.module.css';
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';
import { ingredientObjectType } from '../../utils/data';
import { useInView } from "react-intersection-observer";

const BurgerIngredientsGroup = (props) => {

  //Отслеживание какие группы ингредиентов видны
  const { ref, inView } = useInView({
    threshold: 0.15
  });
  
  React.useEffect(()=>{
    props.setScrollTab({
      ...props.scrollTab,
      [props.ingredient.type]: inView
    });
  },[inView]);
  ////

  return (
    <li>
      <p className="text text_type_main-medium">{props.ingredient.type}</p>
      <ul ref={ref} className={`${styles['burger-ingredients-group__group']} pl-4 pr-2 pt-6 pb-10`}>
        {props.ingredient.list.map(function (item) {
          return <BurgerIngredientsItem item={item} key={item._id} openModal={props.openModal}/>
        })}
      </ul>
    </li>
  );
}

BurgerIngredientsGroup.propTypes = {
  ingredient: PropTypes.shape({
    type: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape(ingredientObjectType))
  })
}; 

export default BurgerIngredientsGroup;