import styles from './OrderDetails.module.css';
import imageDone from '../../images/done.svg'

function OrderDetails() {
  return (
    <div className={`${styles.order} pt-15 pb-15 pr-25 pl-25`}>
      <div className='text text_type_digits-large pb-8'>034536</div>
      <div className='text text_type_main-medium pb-8'>идентификатор заказа</div>
      <div className='pb-15'>
        <img src={imageDone} alt="" />
      </div>
      <div className='text text_type_main-medium pb-2'>Ваш заказ начали готовить</div>
      <div className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</div>
    </div>
  )
}

export default OrderDetails;