import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Components.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Components = () => {
  return (
    <ul className={styles.components__list} >
      <li className={styles['components__item']}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
      </li>
      <li className={styles['components__item']}>
        <DragIcon />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
      </li>
      <li className={styles['components__item']}>
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
      </li>
    </ul>
  )
}

export default Components;