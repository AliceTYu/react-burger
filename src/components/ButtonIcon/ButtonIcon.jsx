import styles from './ButtonIcon.module.css';

import PropTypes from 'prop-types';

ButtonIcon.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string
};

function ButtonIcon({ children, text }) {
  return (
    <button className={`${styles.btn} pt-4 pr-5 pb-4 pl-5 mr-2`}>
      <div className={`${styles.image} pr-2`}>
        {children}
      </div>
      <div className={`${styles.content} text text_type_main-default`}>
        {text}
      </div>
    </button>
  )
}



export default ButtonIcon;