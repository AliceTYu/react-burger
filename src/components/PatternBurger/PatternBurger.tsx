import { ReactNode } from "react";
import styles from "./PatternBurger.module.css";

interface propTypes {
  type?: string;
  children: ReactNode;
}

function PatternBurger({ children, type }: propTypes): JSX.Element {
  return (
    <div
      className={`${styles.patternBlock} constructor-element constructor-element_pos_${type}`}
    >
      {children}
    </div>
  );
}

export default PatternBurger;
