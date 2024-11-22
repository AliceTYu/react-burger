import ModalHeader from '../ModalHeader/ModalHeader';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ModalBackDrop from '../ModalBackDrop/ModalBackDrop';
import { useEffect } from 'react';
const modalRoot = document.getElementById("react-modals");

Modal.propTypes = {
    header: PropTypes.string,
    children: PropTypes.node
};

function Modal({ children, header, onClose }) {

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }
        document.addEventListener('keydown', handleEscape)

        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    return createPortal(
        (<ModalOverlay onClick={onClose}>
            <div onClick={e => e.stopPropagation()} className={`${styles.modal} pt-10 pr-10 pl-10 pb-15`}>
                <div className={styles.modalTitle}>
                    <ModalHeader>{header}</ModalHeader>
                    <ModalBackDrop onClose={onClose} />
                </div>
                {children}
            </div>
        </ModalOverlay>)
        , modalRoot)
}

export default Modal;
