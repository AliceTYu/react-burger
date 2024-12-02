import { IngredientType } from '../../utils/types';
import IngredientInfo from '../IngredientInfo/IngredientInfo';
import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

IngredientDetails.propTypes = {
  choiceIngredient: PropTypes.shape(IngredientType)
}

function IngredientDetails({ choiceIngredient }) {
  return (
    <div className={styles.ingredient}>
      <img className='pb-4' src={choiceIngredient.image_large} alt={choiceIngredient.name} />
      <h2 className={`text text_type_main-medium pb-8`}>{choiceIngredient.name}</h2>
      <ul className={styles.list}>
        <li className='pr-5'>
          <IngredientInfo title='Калории,ккал' count={choiceIngredient.calories} />
        </li>
        <li className='pr-5'>
          <IngredientInfo title='Белки, г' count={choiceIngredient.proteins} />
        </li>
        <li className='pr-5'>
          <IngredientInfo title='Жиры, г' count={choiceIngredient.fat} />
        </li>
        <li>
          <IngredientInfo title='Углеводы, г' count={choiceIngredient.carbohydrates} />
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails;