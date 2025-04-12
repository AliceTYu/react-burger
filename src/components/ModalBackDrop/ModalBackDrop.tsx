import {
  Button,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
// import styles from './ModalBackDrop.module.css';

interface propTypes {
  onClose?: () => void;
}

function ModalBackDrop({ onClose }: propTypes): JSX.Element {
  return (
    <Button
      onClick={onClose}
      htmlType="button"
      type="secondary"
      size="small"
      extraClass="pt-1 pl-1 pr-1 pb-1"
      data-testid="modal-close"
    >
      <CloseIcon type="primary" />
    </Button>
  );
}

export default ModalBackDrop;
