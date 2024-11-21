import CardBlock from '../CardBlock/CardBlock';
import styles from './ListBlock.module.css';
import PropTypes from 'prop-types';

ListBlock.propTypes = {
  type: PropTypes.string,
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
  }))
}; 

function ListBlock({dataBase, type, onClick, setIdIngredient}) {
  return (
    <ul className={`${styles.itemsList} mt-4 mr-1 mb-10 ml-4`}>
        {dataBase.map(el => {
          return (
            el.type === type &&
            <li key={el._id} className={`${styles.item} pl-4 pr-4 pb-6`}>
              <CardBlock setIdIngredient={setIdIngredient} id={el._id} onClick={onClick} title={el.name} image={el.image} price={el.price} count={1}></CardBlock>
            </li>
          )
        })}
    </ul>
  )
}

export default ListBlock;