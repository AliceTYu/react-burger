import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceBlock from '../PriceBlock/PriceBlock';
import styles from './BurgerConstructor.module.css';
import ListConstructor from '../ListConstructor/ListConstructor';
import BurgerTopButtom from '../BurgerTopButtom/BurgerTopButtom';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ADD_BUN, ADD_INGREDIENTS } from '../../services/actions/currentIngredients';
import { v4 as uuidv4 } from 'uuid';
import { useMemo } from 'react';
import { arrayForRequest } from '../../utils/arrayForRequest';
import { getRequestBac } from '../../services/thunks.js/thunks';
import { ORDER_ERROR } from '../../services/actions/order';

function BurgerConstructor({ onClick }) {
  const dispatch = useDispatch()
  const choiceIngredients = useSelector(state => state.currentIngredients.ingredients);
  const choiceBun = useSelector(state => state.currentIngredients.bun);

  const [, dropTarget] = useDrop({
    accept: 'sauseMain',
    drop(itemId) {
      dispatch({ type: ADD_INGREDIENTS, payload: { id: uuidv4(), newIngredient: itemId } })
    },
  });

  const [, dropTarget2] = useDrop({
    accept: 'bun',
    drop(itemId) {
      dispatch({ type: ADD_BUN, payload: { bun: itemId } })
    },
  });

  const [, dropTarget3] = useDrop({
    accept: 'bun',
    drop(itemId) {
      dispatch({ type: ADD_BUN, payload: { bun: itemId } })
    },
  });

  const totalPrice = useMemo(() => {
    let total = 0;

    if (choiceBun) {
      total += choiceBun.price * 2;
    }

    choiceIngredients.map(el => {
      if (el.price) {
        total += el.price;
      }
    });
    return total;
  }, [choiceIngredients, choiceBun]);

  const sendreauest = () => {
    if (!choiceBun || choiceIngredients.length == 0) {
      return dispatch({ type: ORDER_ERROR, payload: { error: true } })
    }
    dispatch({ type: ORDER_ERROR, payload: { error: false } })
    dispatch(getRequestBac(arrayForRequest(choiceBun, choiceIngredients)))
  }

  function onClickOrder() {
    onClick()
    sendreauest()
  }

  return (
    <div className={styles.burgerConstructorContainer}>
      <section className={styles.burgerConstructor}>
        <div ref={dropTarget2}>
          <BurgerTopButtom type='top' type_rus='верх' />
        </div>

        <div className={styles.burgerConstructorList} ref={dropTarget}>
          <ListConstructor />
        </div>

        <div ref={dropTarget3}>
          <BurgerTopButtom type='bottom' type_rus='низ' />
        </div>
      </section>

      <div className={`${styles.footer} mt-10`}>
        <div className='mr-10'>
          <PriceBlock price={totalPrice} />
        </div>
        <Button onClick={onClickOrder} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div >
  )
}

export default BurgerConstructor;