import React from 'react';
import styles from './AppHeader.module.css'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom';
import { PATH_FEED,PATH_PROFILE,PATH_MAIN } from '../App/App';

export const CONSTRUCTOR = '';
export const FEED = 'feed';
export const PROFILE = 'profile';

const AppHeader: React.FC<{ active:string }> = ({ active }) => {

  const navigate = useNavigate();

  function onClickConstructor():void {
    navigate(PATH_MAIN);
  }
  function onClickFeed():void {
    navigate(PATH_FEED);
  }
  function onClickProfile():void {
    navigate(PATH_PROFILE);
  }

  return (
    <header className={`${styles.header} mt-10 mb-10 pt-4 pb-4`}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__list}>
          <div className={styles.header__flex}>
            <li>
              <div className={`${styles.header__item} pl-4 pr-4 pt-5 pb-5`} onClick={onClickConstructor}>
                {active === CONSTRUCTOR
                  ?
                  <>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default">Конструктор</p>
                  </>
                  :
                  <>
                    <BurgerIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive">Конструктор</p>
                  </>
                }
              </div>
            </li>
            <li>
              <div className={`${styles.header__item} pl-4 pr-4 pt-5 pb-5`} onClick={onClickFeed}>
                {active === FEED
                  ?
                  <>
                    <ListIcon type="primary" />
                    <p className="text text_type_main-default">Лента заказов</p>
                  </>
                  :
                  <>
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                  </>
                }
              </div>
            </li>
          </div>
          <li>
            <div className={`${styles.header__item} pl-4 pr-4 pt-5 pb-5`} onClick={onClickProfile}>
              {active === PROFILE
                ?
                <>
                  <ProfileIcon type="primary" />
                  <p className="text text_type_main-default">Личный кабинет</p>
                </>
                :
                <>
                  <ProfileIcon type="secondary" />
                  <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
                </>
              }
            </div>
          </li>
        </ul>
      </nav>
      <div className={styles.header__logo}>
        <Logo />
      </div>
    </header>
  );
}

export default AppHeader;