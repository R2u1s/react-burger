import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Tabs.module.css';
import { ingredientTypes } from '../BurgerIngredients/BurgerIngredients';

function Tabs({handleTab}) {
    const [current, setCurrent] = React.useState(ingredientTypes.bun);
    
    //Активируем нужный таб(при скролле) - первый видимый в списке
    React.useEffect(()=>{
       setCurrent(Object.keys(handleTab).find(item => handleTab[item] === true))
    },[handleTab]);
    ////

    return (
      <div className={`${styles['tabs']} mb-10`}>
        <Tab value={ingredientTypes.bun} active={current === ingredientTypes.bun} onClick={setCurrent}>
          {ingredientTypes.bun}
        </Tab>
        <Tab value={ingredientTypes.sauce} active={current === ingredientTypes.sauce} onClick={setCurrent}>
          {ingredientTypes.sauce}
        </Tab>
        <Tab value={ingredientTypes.main} active={current === ingredientTypes.main} onClick={setCurrent}>
          {ingredientTypes.main}
        </Tab>
      </div>
    )
  }

export default Tabs;