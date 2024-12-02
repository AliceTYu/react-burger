import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ListConstructor.module.css';
import { IngredientType } from '../../utils/types';
import PropTypes from 'prop-types';

ListConstructor.propTypes = {
  dataBase: PropTypes.arrayOf(PropTypes.shape(IngredientType))
}

function ListConstructor({ dataBase }) {
  return (
    <ul className={`${styles.itemsList} mt-4 mr-1 mb-4 ml-4`}>
      {dataBase.filter(el => el.type !== 'bun').map(el => {
        return (
          <li key={el._id} className={`${styles.item} pb-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={el.name}
              price={el.price}
              thumbnail={el.image_mobile}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default ListConstructor;