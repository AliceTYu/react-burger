import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceBlock from '../PriceBlock/PriceBlock';
import styles from './BurgerConstructor.module.css';
import ListConstructor from '../ListConstructor/ListConstructor';
import { data } from '../../utils/data';


function BurgerConstructor() {
  return (
    <section className={styles.burgerConstructor}>
      {data.filter(el => el.type === 'bun' && el.name === 'Краторная булка N-200i').map(el => {
          return (
              <div key={el._id} className={`${styles.item} ml-10 mb-2`}>
                  <ConstructorElement
                      type="top"
                      isLocked={true}
                      text={el.name}
                      price={el.price}
                      thumbnail={el.image_mobile}
                  />
              </div>
          )})
      }

      <div className={styles.conteiner}>
        <div className={styles.burgerConstructorList}>
          <ListConstructor/>
        </div>
      </div>

      {data.filter(el => el.type === 'bun' && el.name === 'Флюоресцентная булка R2-D3').map(el => {
            return (
                <div key={el._id} className={`${styles.item} ml-10 mt-2`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={el.name}
                        price={el.price}
                        thumbnail={el.image_mobile}
                    />
                </div>
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