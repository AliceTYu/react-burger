import { useSelector } from 'react-redux';
import CardBlock from '../CardBlock/CardBlock';
import styles from './ListBlock.module.css';
import PropTypes from 'prop-types';

ListBlock.propTypes = {
  type: PropTypes.string,
};

function ListBlock({ type, onClick }) {
  const allIngredients = useSelector(state => state.allIngredientsReducer.allIngredients);

  return (
    <ul className={`${styles.itemsList} mt-4 mr-1 mb-10 ml-4`}>
      {allIngredients && allIngredients.map(el => {
        return (
          el.type === type &&
          <li key={el._id} className={`${styles.item} pl-4 pr-4 pb-6`}>
            <CardBlock type={type} onClick={onClick} elDataBase={el} />
          </li>
        )
      })}
    </ul>
  )
}

export default ListBlock;