import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Tabs.module.css';
import { ingredientTypes } from '../BurgerIngredients/BurgerIngredients';

function Tabs({scrollTab,onClickTab}) {
    const [current, setCurrent] = React.useState(ingredientTypes.bun);
    
    //Активируем нужный таб(при скролле) - первый видимый в списке
    React.useEffect(()=>{
      //Проверяем есть ли Tab со значением 'true', если нет, то возвращаем текущий
      const moveToTab = Object.keys(scrollTab).find(item => scrollTab[item] === true);
      moveToTab ? setCurrent(moveToTab) : setCurrent(current);
    },[scrollTab]);
    ////
    
    function handleClick(tab){
      onClickTab(tab);
    }

    return (
      <div className={`${styles['tabs']} mb-10`}>
        <Tab value={ingredientTypes.bun} active={current === ingredientTypes.bun} onClick={handleClick}>
          {ingredientTypes.bun}
        </Tab>
        <Tab value={ingredientTypes.sauce} active={current === ingredientTypes.sauce} onClick={handleClick}>
          {ingredientTypes.sauce}
        </Tab>
        <Tab value={ingredientTypes.main} active={current === ingredientTypes.main} onClick={handleClick}>
          {ingredientTypes.main}
        </Tab>
      </div>
    )
  }

export default Tabs;