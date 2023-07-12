import React from 'react';
import PropTypes from 'prop-types';
import styles from './Feed.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { sum } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { statusRus } from '../../utils/data';
import { convertDate } from '../../utils/utils';
import { TOrder } from '../../types/types';

const FeedOrder: React.FC<{ 
  status:boolean;
  order: TOrder;
  navigatePath: string
 }> = ({ status, order, navigatePath }) => {

  const navigate = useNavigate();

  const onClickHandler = (id:string) => {
    navigate(`${navigatePath}/${id}`);
  }

  const getData = (store) => ({
    ingredientsList: store.burger.ingredientsList,
  });
  const { ingredientsList } = useSelector(getData);

  return (
    <li /* name='order' */ id={order._id} className={styles['feed__order']} onClick={() => { onClickHandler(order._id) }}>
      <div className={styles['feed__id-time']}>
        <div className="text text_type_digits-default">
          {`#${order.number}`}
        </div>
        <p className="text text_type_main-default text_color_inactive">
          {convertDate(order.createdAt)}
        </p>
      </div>
      <div className={`text text_type_main-medium`}>
        {order.name}
      </div>
      {status && (order.status === "done" ?
        (<p className={`${styles['feed__status']} text text_type_main-default text_color_success`}>
          {statusRus(order.status)}
        </p>) :
        (<p className={`${styles['feed__status']} text text_type_main-default`}>
          {statusRus(order.status)}
        </p>))
      }
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

export default FeedOrder;