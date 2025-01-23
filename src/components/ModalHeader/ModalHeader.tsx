// import styles from './ModalHeader.module.css';

import { ReactNode } from "react";

interface propTypes {
  children: ReactNode;
}

function ModalHeader({ children }: propTypes): JSX.Element {
  return <div className="text text_type_main-large">{children}</div>;
}

export default ModalHeader;
