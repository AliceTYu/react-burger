import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceBlock from '../PriceBlock/PriceBlock';
import styles from './BurgerConstructor.module.css';
import ListConstructor from '../ListConstructor/ListConstructor';
import { data } from '../../utils/data';
import BurgerTopButtom from '../BurgerTopButtom/BurgerTopButtom';


function BurgerConstructor() {
  return (
    <section className={styles.burgerConstructor}>
      {data.filter(el => el.type === 'bun' && el.name === 'Краторная булка N-200i').map(el => {
          return (
              <BurgerTopButtom key={el._id} type='top' id={el.id} name={el.name} image={el.image_mobile} price={el.price} type_rus='верх'/>
          )})
      }

      <div className={styles.conteiner}>
        <div className={styles.burgerConstructorList}>
          <ListConstructor/>
        </div>
      </div>

      {data.filter(el => el.type === 'bun' && el.name === 'Краторная булка N-200i').map(el => {
          return (
              <BurgerTopButtom key={el._id} type='bottom' id={el.id} name={el.name} image={el.image_mobile} price={el.price} type_rus='низ'/>
          )})
      }
        
      <div className={`${styles.footer} mt-10`}>
        <div className='mr-10'><PriceBlock price={610}></PriceBlock></div>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;