import React from 'react';
import styles from './ConstructorElementsList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from '../../services/dataContext';

const ConstructorElementsList = () => {

  const { burger,setIngredients } = React.useContext(DataContext);

  function deleteIngredient(id) {
    setIngredients({ ingredients: burger.ingredients.filter(item => item._id !== id)});
  }

  const findBun = React.useMemo(
    () =>
      burger.ingredients.find(function(item) {
        return item.type === 'bun'}),
  [burger]);

  const filterNoBuns = React.useMemo(
    () =>
      burger.ingredients.filter(function(item) {
        return item.type !== 'bun'}),
  [burger]
  );

  function bun (name, priceBun, imageBun, topOrBottom) {
    let pos ='';
    topOrBottom === 'top' ? pos = 'верх' : pos = 'низ';
    return (
      <ConstructorElement
          type = {topOrBottom}
          isLocked = 'true'
          text={`${name} (${pos})`}
          price={priceBun}
          thumbnail={imageBun}
        />
    )
  }

  return (

    <ul className={`${styles['constructor-elements-list__list']}`}>
     {<li className={`${styles['constructor-elements-list__item']} pl-4`} key={bun._id} id={bun._id} >
        {bun(findBun.name,findBun.price, findBun.image,'top')}
      </li> }
     
      { <ul className={styles['constructor-elements-list__list-ingredients']}>
      {filterNoBuns
        .map(function (item) {
          return (
            <li className={styles['constructor-elements-list__item']} key={item._id} id={item._id} onClick={()=>deleteIngredient(item._id)}>
              <DragIcon />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          )
        })}
        </ul>}
      {<li className={`${styles['constructor-elements-list__item']} pl-4`} key={bun._id} id={bun._id}>
        {bun(findBun.name,findBun.price, findBun.image,'bottom')}
      </li> }
    </ul>
  )
}

export default ConstructorElementsList;