import CardBlock from "../CardBlock/CardBlock";
import styles from "./ListBlock.module.css";
import { IIngredientType } from "../../utils/types";
import { useTypesSelector } from "../../services/reducers";

interface propTypes {
  type: string;
  onClick?: () => void;
}

function ListBlock({ type, onClick }: propTypes): JSX.Element {
  const allIngredients = useTypesSelector(
    (state) => state.allIngredientsReducer.allIngredients
  );

  return (
    <ul className={`${styles.itemsList} mt-4 mr-1 mb-10 ml-4`}>
      {allIngredients &&
        allIngredients.map((el: IIngredientType) => {
          return (
            el.type === type && (
              <li
                data-testid={`ingredient-${el._id}`}
                key={el._id}
                className={`${styles.item} pl-4 pr-4 pb-6`}
              >
                <CardBlock type={type} onClick={onClick} elDataBase={el} />
              </li>
            )
          );
        })}
    </ul>
  );
}

export default ListBlock;
