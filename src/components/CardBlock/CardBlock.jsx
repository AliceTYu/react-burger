import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceBlock from '../PriceBlock/PriceBlock';
import styles from './CardBlock.module.css';

import PropTypes from 'prop-types';

CardBlock.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  count: PropTypes.number
};

function CardBlock({title, price, image, count}) {
  return (
    <>
        {count > 0 && <div className={styles.cardCount}><Counter  count={count} size="default" extraClass="m-1" /></div>}
        <img src={image} alt={`${title}.`} />
        <PriceBlock price={price} fsize={1}/>
        <div className={`${styles.title} text text_type_main-default`}>{title}</div>
    </>
  )
}

export default CardBlock;