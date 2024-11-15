import { data } from '../../utils/data';
import CardBlock from '../CardBlock/CardBlock';
import styles from './ListBlock.module.css';
import PropTypes from 'prop-types';

ListBlock.propTypes = {
  type: PropTypes.string
}; 

function ListBlock({type}) {
  return (
    <ul className={`${styles.itemsList} mt-4 mr-1 mb-10 ml-4`}>
        {data.map(el => {
          return (
            el.type === type &&
            <li key={el._id} className={`${styles.item} pl-4 pr-4 pb-6`}>
              <CardBlock title={el.name} image={el.image} price={el.price} count={1}></CardBlock>
            </li>
          )
        })}
    </ul>
  )
}

export default ListBlock;