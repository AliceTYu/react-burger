import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerTopButtom.module.css';
import PropTypes from 'prop-types';

BurgerTopButtom.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['bottom', 'top']),
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  type_rus: PropTypes.string
};

function BurgerTopButtom({id, type, name, price, image, type_rus}) {
  return (
    <div key={id} className={`${styles.item} ml-10 mb-2`}>
                  <ConstructorElement
                      type={type}
                      isLocked={true}
                      text={`${name} (${type_rus})`}
                      price={price}
                      thumbnail={image}
                  />
              </div>
  )
}

export default BurgerTopButtom;