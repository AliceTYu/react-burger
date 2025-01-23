import { useSelector } from "react-redux";
import IngredientInfo from "../IngredientInfo/IngredientInfo";
import styles from "./IngredientDetails.module.css";
import { useParams } from "react-router-dom";
import { IIngredientType } from "../../utils/types";

function IngredientDetails() {
  const allIngredients = useSelector(
    // @ts-ignore
    (state) => state.allIngredientsReducer.allIngredients
  );

  const { idModal } = useParams();

  const ingredientComponents = allIngredients
    .filter((el: IIngredientType) => el._id === idModal)
    .map((el: IIngredientType) => (
      <div className={styles.ingredient} key={el._id}>
        <img className="pb-4" src={el.image_large} alt={el.name} />
        <h2 className={`${styles.text} text text_type_main-medium pb-8`}>
          {el.name}
        </h2>
        <ul className={styles.list}>
          <li className="pr-5">
            <IngredientInfo title="Калории, ккал" count={el.calories} />
          </li>
          <li className="pr-5">
            <IngredientInfo title="Белки, г" count={el.proteins} />
          </li>
          <li className="pr-5">
            <IngredientInfo title="Жиры, г" count={el.fat} />
          </li>
          <li>
            <IngredientInfo title="Углеводы, г" count={el.carbohydrates} />
          </li>
        </ul>
      </div>
    ));

  return ingredientComponents;
}

export default IngredientDetails;
