import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Tabs.module.css';
import { ingredientTypes } from '../BurgerIngredients/BurgerIngredients';
import { TIngredientsTabs, TIngredientsTabsActive } from '../../types/types';

const Tabs: React.FC<{
  scrollTab: TIngredientsTabsActive,
  onClickTab: (value: string) => void}> = ({ scrollTab, onClickTab }) => {
  const [current, setCurrent] = React.useState<typeof ingredientTypes.bun>(ingredientTypes.bun);

  //Активируем нужный таб(при скролле) - первый видимый в списке
  React.useEffect(() => {
    //Проверяем есть ли Tab со значением 'true', если нет, то возвращаем текущий
    const moveToTab = (Object.keys(scrollTab) as (keyof typeof scrollTab)[]).find((item) => scrollTab[item] === true);
    moveToTab ? setCurrent(moveToTab) : setCurrent(current);
  }, [scrollTab]);
  ////

  return (
    <div className={`${styles['tabs']} mb-10`}>
      <Tab value={ingredientTypes.bun} active={current === ingredientTypes.bun} onClick={onClickTab}>
        {ingredientTypes.bun}
      </Tab>
      <Tab value={ingredientTypes.sauce} active={current === ingredientTypes.sauce} onClick={onClickTab}>
        {ingredientTypes.sauce}
      </Tab>
      <Tab value={ingredientTypes.main} active={current === ingredientTypes.main} onClick={onClickTab}>
        {ingredientTypes.main}
      </Tab>
    </div>
  )
}

export default Tabs;