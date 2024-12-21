import { Link, useLocation } from 'react-router-dom';
import styles from './ButtonIcon.module.css';

import PropTypes from 'prop-types';

ButtonIcon.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  toLink: PropTypes.string,
  isProfileActive: PropTypes.bool
};

function ButtonIcon({ children, text, toLink, isProfileActive }) {
  const location = useLocation()

  return (
    <Link to={toLink} className={`${styles.btn} pt-4 pr-5 pb-4 pl-5 mr-2 `}>
      <div className={`${styles.image} pr-2`}>
        {children}
      </div>
      <div className={`${styles.content} text text_type_main-default ${toLink === '/profile' ? isProfileActive ? '' : 'text_color_inactive' : location.pathname === toLink ? '' : 'text_color_inactive'}`}>
        {text}
      </div>
    </Link>
  )
}

export default ButtonIcon;