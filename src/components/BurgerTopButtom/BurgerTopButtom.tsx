import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerTopButtom.module.css";
import PatternBurger from "../PatternBurger/PatternBurger";
import { useTypesSelector } from "../../services/reducers";

interface propTypes {
  type: "bottom" | "top";
  type_rus: string;
}

function BurgerTopButtom({ type, type_rus }: propTypes): JSX.Element {
  const choiceBun = useTypesSelector((state) => state.currentIngredients.bun);

  return (
    <div className={`${styles.item} ml-10 mb-2`}>
      {!choiceBun && <PatternBurger type={type}>Выберите булки</PatternBurger>}
      {choiceBun && (
        <ConstructorElement
          type={type}
          isLocked={true}
          text={`${choiceBun.name} (${type_rus})`}
          price={choiceBun.price}
          thumbnail={choiceBun.image}
        />
      )}
    </div>
  );
}

export default BurgerTopButtom;
