import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// import styles from './ModalBackDrop.module.css';

function ModalBackDrop({onClose}) {
  return (
    <Button onClick={onClose} htmlType="button" type="secondary" size='small' extraClass='pt-1 pl-1 pr-1 pb-1'>
        <CloseIcon type="primary" />
    </Button>
  )
}

export default ModalBackDrop;