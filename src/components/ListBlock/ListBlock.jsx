import { IngredientType } from '../../utils/types';
import CardBlock from '../CardBlock/CardBlock';
import styles from './ListBlock.module.css';
import PropTypes from 'prop-types';

ListBlock.propTypes = {
  type: PropTypes.string,
  dataBase: PropTypes.arrayOf(PropTypes.shape(IngredientType))
};

function ListBlock({ dataBase, type, onClick, setChoiceIngredient }) {
  return (
    <ul className={`${styles.itemsList} mt-4 mr-1 mb-10 ml-4`}>
      {dataBase.map(el => {
        return (
          el.type === type &&
          <li key={el._id} className={`${styles.item} pl-4 pr-4 pb-6`}>
            <CardBlock setChoiceIngredient={setChoiceIngredient} onClick={onClick} elDataBase={el} count={1} />
          </li>
        )
      })}
    </ul>
  )
}

export default ListBlock;