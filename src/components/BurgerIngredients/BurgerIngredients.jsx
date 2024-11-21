import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { useRef, useState } from 'react';
import ListBlock from '../ListBlock/ListBlock';
import PropTypes from 'prop-types';

BurgerIngredients.propTypes = {
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
  }

function BurgerIngredients({dataBase, onClick, setIdIngredient}) {
  const [current, setCurrent] = useState('bun')

  const bunRef = useRef()
  const sauceRef = useRef()
  const mainRef = useRef()

  const classNameText='text text_type_main-medium'

  function currentScroll (nameRef) {
    return nameRef.current.scrollIntoView({behavior: 'smooth'});
  }

  const scrollToMyRef = (value) => {
    switch (value) {
      case 'bun':
        currentScroll(bunRef)
        break;
      case 'sauce':
        currentScroll(sauceRef)
        break;
      case 'main':
        currentScroll(mainRef)
        break;
      default:
        break
    }
    setCurrent(value)
  } 


  return (
    <section className={`${styles.tab} mr-10`}>
      <div className={`${styles.tabBlock} pb-10`}>
        <Tab value="bun" active={current === 'bun'} onClick={() => scrollToMyRef('bun')}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => scrollToMyRef('sauce')}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={() => scrollToMyRef('main')}>
          Начинки
        </Tab>
      </div>

      <div className={styles.container}>
        <div className={styles.ingredientsBlock}>
          <h2 ref={bunRef} className={classNameText}>Булки</h2>
          <ListBlock setIdIngredient={setIdIngredient} onClick={onClick} dataBase={dataBase} type='bun' />
          <h2 ref={sauceRef} className={classNameText}>Соусы</h2>
          <ListBlock setIdIngredient={setIdIngredient} onClick={onClick} dataBase={dataBase} type='sauce'/>
          <h2 ref={mainRef} className={classNameText}>Начинки</h2>
          <ListBlock setIdIngredient={setIdIngredient} onClick={onClick} dataBase={dataBase} type='main'/>
        </div>
      </div>
    </section>
  )
}


export default BurgerIngredients;