import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerTopButtom.module.css';
import PropTypes from 'prop-types';
import PatternBurger from '../PatternBurger/PatternBurger';
import { useSelector } from 'react-redux';

BurgerTopButtom.propTypes = {
  type: PropTypes.oneOf(['bottom', 'top']),
  type_rus: PropTypes.string
};

function BurgerTopButtom({ type, type_rus }) {
  const choiceBun = useSelector(state => state.currentIngredients.bun);

  return (
    <div className={`${styles.item} ml-10 mb-2`}>
      {!choiceBun && <PatternBurger type={type}>Выберите булки</PatternBurger>}
      {choiceBun && <ConstructorElement
        type={type}
        isLocked={true}
        text={`${choiceBun.name} (${type_rus})`}
        price={choiceBun.price}
        thumbnail={choiceBun.image}
      />}
    </div>
  )
}

export default BurgerTopButtom;