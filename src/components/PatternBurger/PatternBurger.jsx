import styles from './PatternBurger.module.css';
import PropTypes from 'prop-types';

PatternBurger.propTypes = {
    type: PropTypes.string,
}

function PatternBurger({ children, type }) {
    return (
        <div className={`${styles.patternBlock} constructor-element constructor-element_pos_${type}`} >
            {children}
        </div >
    )
}

export default PatternBurger;