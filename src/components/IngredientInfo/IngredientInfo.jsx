import styles from './IngredientInfo.module.css';
import PropTypes from 'prop-types';

IngredientInfo.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
}

function IngredientInfo({ title, count }) {
  return (
    <div className={`${styles.ingredInfo}`}>
      <div className='text text_type_main-default text_color_inactive'>{title}</div>
      <div className='text text_type_digits-default text_color_inactive'>{count}</div>
    </div>
  )
}

export default IngredientInfo;