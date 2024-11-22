import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceBlock from '../PriceBlock/PriceBlock';
import styles from './CardBlock.module.css';
import PropTypes, { number } from 'prop-types';

import { IngredientType } from '../../utils/types';

CardBlock.propTypes = {
  elDataBase: (PropTypes.shape(IngredientType)),
  count: number
}

function CardBlock({ elDataBase, count, onClick, setChoiceIngredient }) {
  const clickHun = () => {
    setChoiceIngredient(elDataBase)
  }

  return (
    <>
      <div className={styles.cardBlock}>
        {count > 0 && <div className={styles.cardCount}><Counter count={count} size="default" extraClass="m-1" /></div>}
        <img src={elDataBase.image} alt={`${elDataBase.name}.`} />
        <PriceBlock price={elDataBase.price} fsize={1} />
        <div className={`${styles.title} text text_type_main-default`}>{elDataBase.name}</div>
      </div>
      <button id={elDataBase.id} onClick={function (e) { onClick(); clickHun() }} className={styles.btnNone}></button>
    </>
  )
}

export default CardBlock;