import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Tabs.module.css';
import { ingredientTypes } from '../BurgerIngredients/BurgerIngredients';

function Tabs({scrollTab}) {
    const [current, setCurrent] = React.useState(ingredientTypes.bun);
    
    //Активируем нужный таб(при скролле) - первый видимый в списке
    React.useEffect(()=>{
       setCurrent(Object.keys(scrollTab).find(item => scrollTab[item] === true))
    },[scrollTab]);
    ////

    const onClickAction = (tab) => {
      console.log(tab);
    }

    return (
      <div className={`${styles['tabs']} mb-10`}>
        <Tab value={ingredientTypes.bun} active={current === ingredientTypes.bun} onClick={onClickAction}>
          {ingredientTypes.bun}
        </Tab>
        <Tab value={ingredientTypes.sauce} active={current === ingredientTypes.sauce} onClick={onClickAction}>
          {ingredientTypes.sauce}
        </Tab>
        <Tab value={ingredientTypes.main} active={current === ingredientTypes.main} onClick={onClickAction}>
          {ingredientTypes.main}
        </Tab>
      </div>
    )
  }

export default Tabs;