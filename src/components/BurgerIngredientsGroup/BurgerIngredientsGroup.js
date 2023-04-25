import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './BurgerIngredientsGroup.module.css';
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';
import { ingredientObjectType } from '../../utils/data';
import { useInView } from "react-intersection-observer";

const BurgerIngredientsGroup = ({scrollTab,setScrollTab,refState,setRefState,ingredient,openModal}) => {
  
  //Отслеживание какие группы ингредиентов видны
  const ref = React.useRef();
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2
  });

  React.useEffect(()=>{
    //изменение стэйта видимости групп
    setScrollTab({
      ...scrollTab,
      [ingredient.type]: inView
    });
    //получение рефов - это надо по-другому как-то сделать
    setRefState({
      ...refState,
      [ingredient.type]:ref.current
    })
  },[inView]);
  ////

  const setRefs = React.useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    []
  );

  return (
    <li>
      <p ref={setRefs} className="text text_type_main-medium">{ingredient.type}</p>
      <ul className={`${styles['burger-ingredients-group__group']} pl-4 pr-2 pt-6 pb-10`}>
        {ingredient.list.map(function (item) {
          return <BurgerIngredientsItem item={item} key={item._id} openModal={openModal}/>
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