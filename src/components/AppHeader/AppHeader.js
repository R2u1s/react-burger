import React from 'react';
import ReactDOM from 'react-dom';
import styles from './AppHeader.module.css'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader(){
  return (
    <>
      <header className={`${styles.header} mt-10 mb-10 pt-4 pb-4`}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__list}>
          <div className={styles.header__flex}>
            <li>
              <a href='#' className={`${styles.header__item} pl-4 pr-4 pt-5 pb-5`}>
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default">Конструктор</p>
              </a>
            </li>
            <li>
              <a href='#' className={`${styles.header__item} pl-4 pr-4 pt-5 pb-5`}>
                <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
              </a>
            </li>
          </div>
          <li>
            <a href='#' className={`${styles.header__item} pl-4 pr-4 pt-5 pb-5`}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.header__logo}>
        <Logo />
      </div>
      </header>
    </>
  );
}

export default AppHeader;