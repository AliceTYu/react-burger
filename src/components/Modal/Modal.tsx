import ModalHeader from "../ModalHeader/ModalHeader";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalBackDrop from "../ModalBackDrop/ModalBackDrop";
import { ReactNode, useEffect } from "react";
const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface propTypes {
  header?: string;
  children: ReactNode;
  onClose: () => void;
}

function Modal({ children, header, onClose }: propTypes): JSX.Element {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.modal} pt-10 pr-10 pl-10 pb-15`}
      >
        <div className={styles.modalTitle}>
          <ModalHeader>{header}</ModalHeader>
          <ModalBackDrop onClose={onClose} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

export default Modal;
