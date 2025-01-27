import { ReactNode } from "react";
import styles from "./ModalOverlay.module.css";

interface propTypes {
  children: ReactNode;
  onClick?: () => void;
}

function ModalOverlay({ children, onClick }: propTypes): JSX.Element {
  return (
    <div className={styles.modalOver} onClick={onClick}>
      {children}
    </div>
  );
}

export default ModalOverlay;
