import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceBlock from '../PriceBlock/PriceBlock';
import styles from './BurgerConstructor.module.css';
import ListConstructor from '../ListConstructor/ListConstructor';
import BurgerTopButtom from '../BurgerTopButtom/BurgerTopButtom';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addBun, addIngredients } from '../../services/actions/currentIngredients';
import { v4 as uuidv4 } from 'uuid';
import { useMemo } from 'react';
import { arrayForRequest } from '../../utils/arrayForRequest';
import { getRequestBac } from '../../services/thunks.js/thunks';
import { ORDER_ERROR } from '../../services/actions/order';
import { useNavigate } from 'react-router-dom';

function BurgerConstructor({ onClick }) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const choiceIngredients = useSelector(state => state.currentIngredients.ingredients);
  const choiceBun = useSelector(state => state.currentIngredients.bun);

  const userReg = useSelector(state => state.loginEmailReducer.user)

  const [, dropTarget] = useDrop({
    accept: 'sauseMain',
    drop(itemId) {
      dispatch(addIngredients(uuidv4(), itemId))
    },
  });

  const [, dropTarget2] = useDrop({
    accept: 'bun',
    drop(itemId) {
      dispatch(addBun(itemId))
    },
  });

  const [, dropTarget3] = useDrop({
    accept: 'bun',
    drop(itemId) {
      dispatch(addBun(itemId))
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
    if (Reflect.ownKeys(userReg).length === 0) {
      navigate('/login', { replace: true });
      return;
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