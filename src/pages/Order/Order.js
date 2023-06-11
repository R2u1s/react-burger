import React from 'react';
import PropTypes from 'prop-types';
import styles from './Order.module.css';
import stylesFeed from '../../components/Feed/Feed.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { serverAnswer } from '../../utils/data';
import { sum } from '../../utils/utils';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { uniqueItem } from '../../utils/utils';

function Order() {

  const path = useParams();

  const getData = (store) => ({
    ingredientsList: store.burger.ingredientsList,
    ingredientsRequest: store.burger.ingredientsRequest,
  });

  const { ingredientsList, ingredientsRequest } = useSelector(getData);

  const order = serverAnswer.orders.find(item => item._id === path.id);

  const uniqueIngredients = uniqueItem(order.ingredients);

  const content = React.useMemo(
    () => {
      return ingredientsRequest ? (
        "Загрузка"
      ) : (
        <>{
          <section className={styles['order']}>
            <p className={`${styles['order__id']} text text_type_digits-default`}>{`#${order._id}`}</p>
            <p className={`${styles['order__name']} text text_type_main-medium`}>{`${order.name}`}</p>
            {order.status === "done" ?
              (<p className={`${styles['order__status']} text text_type_main-default text_color_success`}>
                {order.status}
              </p>) :
              (<p className={`${styles['order__status']} text text_type_main-default`}>
                {order.status}
              </p>)
            }
            <p className={`${styles['order__consist']} text text_type_main-medium`}>Состав:</p>
            <ul className={`${styles['order__ingredients']}`}>
              {Object.keys(uniqueIngredients).map(function (id) {
                return (
                  <li key={id} className={`${styles['order__ingredient']}`}>
                    <div className={styles['order__ingredient-flex']}>
                      <div className={stylesFeed['feed__icon-frame']}>
                        <div className={stylesFeed['feed__icon']} style={{ backgroundImage: `url(${ingredientsList[id].image})` }} />
                      </div>
                      <p className={`${styles['order__ingredient-name']} text text_type_main-default`}>
                        {ingredientsList[id].name}
                      </p>
                    </div>
                    <div className={stylesFeed['feed__total']}>
                      <p className="text text_type_digits-default">{`${uniqueIngredients[id]} x ${ingredientsList[id].price}`}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className={styles['order__ingredient-time-total']}>
              <p className="text text_type_main-default text_color_inactive">
                {order.createdAt}
              </p>
              <div className={stylesFeed['feed__total']}>
                <p className="text text_type_digits-default">{sum(order.ingredients.map(function (id) {
                  return ingredientsList[id].price
                }))}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </section>
        }</>
      );
    },
    [ingredientsRequest, ingredientsList]
  );

  return (
    <>
      {content}
    </>
  );
}

export default Order;