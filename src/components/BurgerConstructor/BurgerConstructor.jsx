import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceBlock from '../PriceBlock/PriceBlock';
import styles from './BurgerConstructor.module.css';
import ListConstructor from '../ListConstructor/ListConstructor';
import BurgerTopButtom from '../BurgerTopButtom/BurgerTopButtom';
import { IngredientType } from '../../utils/types';
import PropTypes from 'prop-types';

BurgerConstructor.propTypes = {
  dataBase: PropTypes.arrayOf(PropTypes.shape(IngredientType))
}

function BurgerConstructor({ dataBase, onClick }) {
  return (
    <section className={styles.burgerConstructor}>
      {dataBase.filter(el => el.type === 'bun' && el.name === 'Краторная булка N-200i').map(el => {
        return (
          <BurgerTopButtom key={el._id} type='top' dataBase={el} type_rus='верх' />
        )
      })
      }

      <div className={styles.conteiner}>
        <div className={styles.burgerConstructorList}>
          <ListConstructor dataBase={dataBase} />
        </div>
      </div>

      {dataBase.filter(el => el.type === 'bun' && el.name === 'Краторная булка N-200i').map(el => {
        return (
          <BurgerTopButtom key={el._id} type='bottom' dataBase={el} type_rus='низ' />
        )
      })
      }

      <div className={`${styles.footer} mt-10`}>
        <div className='mr-10'>
          <PriceBlock price={610} />
        </div>
        <Button onClick={onClick} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;