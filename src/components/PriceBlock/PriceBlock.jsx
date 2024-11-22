import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './PriceBlock.module.css';

import PropTypes from 'prop-types';

PriceBlock.propTypes = {
  price: PropTypes.number,
  fsize: PropTypes.number
};

function PriceBlock({ price, fsize }) {
  return (
    <div className={`${styles.priceBlock} pt-1 pb-1`}>
      <div className={`text ${fsize === 1 ? 'text_type_digits-default' : 'text_type_digits-medium'} `}>{price}</div>
      <div><CurrencyIcon type="primary" /></div>
    </div>
  )
}

export default PriceBlock;