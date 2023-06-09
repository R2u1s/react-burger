import React from 'react';
import PropTypes from 'prop-types';
import styles from './Feed.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { sum } from '../../utils/utils';

const FeedOrder = ({ order }) => {

  const getData = (store) => ({
    ingredientsList: store.burger.ingredientsList,
  });
  const { ingredientsList } = useSelector(getData);

  return (
    <li name='order' id={order._id} className={styles['feed__order']}>
      <div className={styles['feed__id-time']}>
        <div className="text text_type_digits-default">
          {`#${order._id}`}
        </div>
        <div className="text text_type_main-default text_color_inactive">
          {order.createdAt}
        </div>
      </div>
      <div className={`${styles['feed__id-time']} text text_type_main-medium`}>
        {order.name}
      </div>
      <div className={styles['feed__icons-total']}>
        <div className={styles['feed__icons']}>
          {order.ingredients.map(function (id, index) {
            if (ingredientsList[id] && index < 6) {
              return <div key={Math.random()} className={styles['feed__icon-frame']} style={{ zIndex: `${100 - index}` }}>
                <div className={styles['feed__icon']} style={{ backgroundImage: `url(${ingredientsList[id].image})` }}>
                  {(index > 4 && order.ingredients.length !== 6) &&
                    <>
                      <div className={`${styles['feed__icon-overlay']}`} />
                      <div className={`${styles['feed__icon-qty']} text text_type_main-default`}>
                        {`+${order.ingredients.length - 6}`}
                      </div>
                    </>
                  }
                </div>
              </div>
            }
          })}
        </div>
        <div className={styles['feed__total']}>
          <p className="text text_type_digits-default">{sum(order.ingredients.map(function (id) {
            return ingredientsList[id].price
          }))}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}

FeedOrder.propTypes = {
  order: (PropTypes.object),
};

export default FeedOrder;