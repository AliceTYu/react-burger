import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import styles from './ListConstructor.module.css';

function ListConstructor() {
  return (
    <ul className={`${styles.itemsList} mt-4 mr-1 mb-4 ml-4`}>
        {data.filter(el => el.type !== 'bun').map(el => {
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