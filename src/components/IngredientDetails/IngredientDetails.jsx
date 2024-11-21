import IngredientInfo from '../IngredientInfo/IngredientInfo';
import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

IngredientDetails.propTypes = {
  dataBase: PropTypes.arrayOf(PropTypes.shape ({
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    image: PropTypes.string,
    proteins: PropTypes.number,
    price: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    __v: PropTypes.number,
  })),
  idIngredient: PropTypes.string}

function IngredientDetails({dataBase, idIngredient}) {
  return (
    dataBase.map(el => {
      return(
        el._id === idIngredient && (<div className={styles.ingredient} key={el._id}>
          <img className='pb-4' src={el.image_large} alt={el.name} />
          <h2 className={`text text_type_main-medium pb-8`}>{el.name}</h2>
          <ul className={styles.list}>
            <li className='pr-5'><IngredientInfo title='Калории,ккал' count={el.calories}/></li>
            <li className='pr-5'><IngredientInfo title='Белки, г' count={el.proteins}/></li>
            <li className='pr-5'><IngredientInfo title='Жиры, г' count={el.fat}/></li>
            <li><IngredientInfo title='Углеводы, г' count={el.carbohydrates}/></li>
          </ul>
        </div>)
      )
    })
  )
}

export default IngredientDetails;