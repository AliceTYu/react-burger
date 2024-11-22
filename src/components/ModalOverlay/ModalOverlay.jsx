import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

ModalOverlay.propTypes = {
  children: PropTypes.node
}

function ModalOverlay({ children, onClick }) {
  return (
    <div className={styles.modalOver} onClick={onClick}>
      {children}
    </div>
  )
}

export default ModalOverlay;