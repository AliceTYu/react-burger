import styles from './ListConstructor.module.css';
import { useSelector } from 'react-redux';
import PatternBurger from '../PatternBurger/PatternBurger';
import LiConstructor from '../LiConstructor/LiConstructor';

function ListConstructor() {
  const choiceIngredients = useSelector(state => state.currentIngredients.ingredients);

  return (
    <ul className={`${styles.itemsList} mt-4 mr-1 mb-4 ml-1`}>
      {choiceIngredients.length === 0 && <PatternBurger>Выберите начинку</PatternBurger>}
      {choiceIngredients.map((el, index) => {
        return (
          <LiConstructor key={el.id} currentEl={el} index={index} />
        )
      })}
    </ul>
  )
}

export default ListConstructor;