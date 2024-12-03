import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceBlock from '../PriceBlock/PriceBlock';
import styles from './CardBlock.module.css';
import PropTypes from 'prop-types';

import { IngredientType } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_INGREDIENT } from '../../services/actions/currentIngredient';
import { useDrag } from 'react-dnd';
import { useMemo } from 'react';

CardBlock.propTypes = {
  elDataBase: (PropTypes.shape(IngredientType)),
  type: PropTypes.string
}

function CardBlock({ type, elDataBase, onClick }) {
  const dispatch = useDispatch()
  const choiceIngredients = useSelector(state => state.currentIngredients.ingredients);
  const choiceBun = useSelector(state => state.currentIngredients.bun);

  const clickHun = () => {
    dispatch({ type: SET_CURRENT_INGREDIENT, payload: { currentIngredient: elDataBase } })
  }

  const [, dragRef] = useDrag({
    type: type === 'bun' ? 'bun' : 'sauseMain',
    item: elDataBase
  });

  const countIngredients = useMemo(() => {
    if (!elDataBase) {
      return 0
    }
    let count = 0;

    if (choiceBun?._id === elDataBase._id) {
      count += 2
    }

    count += choiceIngredients.filter(el => el._id === elDataBase._id).length

    return count;

  }, [choiceIngredients, choiceBun]);

  return (
    <>
      <div className={styles.cardBlock} >
        {countIngredients > 0 && <div className={styles.cardCount}><Counter count={countIngredients} size="default" extraClass="m-1" /></div>}
        <img src={elDataBase.image} alt={`${elDataBase.name}.`} />
        <PriceBlock price={elDataBase.price} fsize={1} />
        <div className={`${styles.title} text text_type_main-default`}>{elDataBase.name}</div>
      </div>
      <button ref={dragRef} id={elDataBase._id} onClick={function (e) { onClick(); clickHun() }} className={styles.btnNone}></button>
    </>
  )
}

export default CardBlock;