import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { useState } from 'react';
import ListBlock from '../ListBlock/ListBlock';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun')

  return (
    <section className={`${styles.tab} mr-10`}>
      <div className={`${styles.tabBlock} pb-10`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.container}>
        <div className={styles.ingredientsBlock}>
          <h2 className='text text_type_main-medium'>Булки</h2>
          <ListBlock type='bun'/>
          <h2 className='text text_type_main-medium'>Соусы</h2>
          <ListBlock type='sauce'/>
          <h2 className='text text_type_main-medium'>Начинки</h2>
          <ListBlock type='main'/>
        </div>
      </div>
    </section>
  )
}


export default BurgerIngredients;