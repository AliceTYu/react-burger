// import styles from './ModalHeader.module.css';
import PropTypes from 'prop-types';
ModalHeader.propTypes = {
  children: PropTypes.node
}

function ModalHeader({children}) {
  return (
    <div className='text text_type_main-large'>
        {children}
    </div>
  )
}

export default ModalHeader;