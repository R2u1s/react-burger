import React from 'react';
import styles from './BurgerIngredientsGroup.module.css';
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';
import { useInView } from "react-intersection-observer";
import { TIngredientsGroup,TIngredientsTabsRef,TIngredientsTabsActive } from '../../types/types';

const BurgerIngredientsGroup: React.FC<{ 
  scrollTab:TIngredientsTabsActive;
  setScrollTab:(value: TIngredientsTabsActive)=> void;
  refState:TIngredientsTabsRef;
  setRefState:(value: TIngredientsTabsRef)=> void;
  ingredient:TIngredientsGroup;
  openModal:()=>void;
 }> = ({scrollTab,setScrollTab,refState,setRefState,ingredient,openModal}) => {

  //Отслеживание какие группы ингредиентов видны
  const ref = React.useRef<HTMLParagraphElement>();

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3
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
    (node:HTMLParagraphElement) => {
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

export default BurgerIngredientsGroup;