import { useSelector } from "react-redux";
import CardBlock from "../CardBlock/CardBlock";
import styles from "./ListBlock.module.css";
import { IIngredientType } from "../../utils/types";

interface propTypes {
  type: string;
  onClick?: () => void;
}

function ListBlock({ type, onClick }: propTypes): JSX.Element {
  const allIngredients = useSelector(
    // @ts-ignore
    (state) => state.allIngredientsReducer.allIngredients
  );

  return (
    <ul className={`${styles.itemsList} mt-4 mr-1 mb-10 ml-4`}>
      {allIngredients &&
        allIngredients.map((el: IIngredientType) => {
          return (
            el.type === type && (
              <li key={el._id} className={`${styles.item} pl-4 pr-4 pb-6`}>
                <CardBlock type={type} onClick={onClick} elDataBase={el} />
              </li>
            )
          );
        })}
    </ul>
  );
}

export default ListBlock;
