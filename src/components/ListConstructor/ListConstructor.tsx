import styles from "./ListConstructor.module.css";
import PatternBurger from "../PatternBurger/PatternBurger";
import LiConstructor from "../LiConstructor/LiConstructor";
import { IIngredientType } from "../../utils/types";
import { useTypesSelector } from "../../services/reducers";

function ListConstructor(): JSX.Element {
  const choiceIngredients = useTypesSelector(
    (state) => state.currentIngredients.ingredients
  );

  return (
    <ul className={`${styles.itemsList} mt-4 mr-1 mb-4 ml-1`}>
      {choiceIngredients.length === 0 && (
        <PatternBurger>Выберите начинку</PatternBurger>
      )}
      {choiceIngredients.map((el: IIngredientType, index: number) => {
        return <LiConstructor key={el.id} currentEl={el} index={index} />;
      })}
    </ul>
  );
}

export default ListConstructor;
