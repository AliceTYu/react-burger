import { useDispatch, useSelector } from 'react-redux';
import { IngredientType } from '../../utils/types';
import CardBlock from '../CardBlock/CardBlock';
import styles from './ListBlock.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { getIngredientsThunks } from '../../services/thunks.js/thunks';

ListBlock.propTypes = {
  type: PropTypes.string,
};

function ListBlock({ type, onClick }) {
  const dispatch = useDispatch();
  const allIngredients = useSelector(state => state.allIngredientsReducer.allIngredients);

  useEffect(() => {
    dispatch(getIngredientsThunks())
  }, [])

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