import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { useEffect, useRef, useState } from 'react';
import ListBlock from '../ListBlock/ListBlock';
import { useSelector } from 'react-redux';

function BurgerIngredients({ onClick }) {
  const [current, setCurrent] = useState('bun')
  const errorSet = useSelector(state => state.allIngredientsReducer.errorSet)

  const bunRef = useRef()
  const sauceRef = useRef()
  const mainRef = useRef()

  const burgerIngredientsRef = useRef()

  const classNameText = 'text text_type_main-medium'

  function currentScroll(nameRef) {
    return nameRef.current.scrollIntoView({ behavior: 'smooth' });
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

  useEffect(() => {
    const handleScroll = () => {
      const bunsTop = bunRef.current.getBoundingClientRect().top;
      const saucesTop = sauceRef.current.getBoundingClientRect().top;
      const fillingsTop = mainRef.current.getBoundingClientRect().top;

      if (bunsTop > 0 && saucesTop > 0) {
        setCurrent('bun');
      } else if (bunsTop < 0 && saucesTop > -230) {
        setCurrent('sauce');
      } else if (saucesTop < 0 && fillingsTop > 0) {
        setCurrent('main');
      }
    };

    burgerIngredientsRef.current.addEventListener('scroll', handleScroll);

    return () => {
      if (burgerIngredientsRef.current) {
        burgerIngredientsRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className={`${styles.tab} mr-10`}>
      {!errorSet &&
        <>
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
            <div ref={burgerIngredientsRef} className={styles.ingredientsBlock}>
              <h2 ref={bunRef} className={classNameText}>Булки</h2>
              <ListBlock onClick={onClick} type='bun' />
              <h2 ref={sauceRef} className={classNameText}>Соусы</h2>
              <ListBlock onClick={onClick} type='sauce' />
              <h2 ref={mainRef} className={classNameText}>Начинки</h2>
              <ListBlock onClick={onClick} type='main' />
            </div>
          </div>
        </>}
      {errorSet && 'Ошибка получения данных'}
    </section>
  )
}


export default BurgerIngredients;