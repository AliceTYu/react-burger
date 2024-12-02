import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerTopButtom.module.css';
import PropTypes from 'prop-types';
import { IngredientType } from '../../utils/types';

BurgerTopButtom.propTypes = {
  dataBase: PropTypes.shape(IngredientType),
  type: PropTypes.oneOf(['bottom', 'top']),
  type_rus: PropTypes.string
};

function BurgerTopButtom({ type, type_rus, dataBase }) {
  return (
    <div className={`${styles.item} ml-10 mb-2`}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={`${dataBase.name} (${type_rus})`}
        price={dataBase.price}
        thumbnail={dataBase.image}
      />
    </div>
  )
}

export default BurgerTopButtom;