import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceBlock from '../PriceBlock/PriceBlock';
import styles from './CardBlock.module.css';

import PropTypes from 'prop-types';

CardBlock.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  id: PropTypes.string,
  count: PropTypes.number
};

function CardBlock({title, price, image, count, onClick, id, setIdIngredient}) {
  const clickHun = (e) => {
    setIdIngredient(e.target.id)
  }
  
  return (
    <>
      <div className={styles.cardBlock}>
          {count > 0 && <div className={styles.cardCount}><Counter  count={count} size="default" extraClass="m-1" /></div>}
          <img src={image} alt={`${title}.`} />
          <PriceBlock price={price} fsize={1}/>
          <div className={`${styles.title} text text_type_main-default`}>{title}</div>
      </div>
      <button id={id} onClick={function(e) {onClick(); clickHun(e)}} className={styles.btnNone}></button>
    </>
  )
}

export default CardBlock;