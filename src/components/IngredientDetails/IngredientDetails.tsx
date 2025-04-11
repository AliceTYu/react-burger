import IngredientInfo from "../IngredientInfo/IngredientInfo";
import styles from "./IngredientDetails.module.css";
import { useParams } from "react-router-dom";
import { IIngredientType } from "../../utils/types";
import { useTypesSelector } from "../../services/reducers";

function IngredientDetails(): JSX.Element {
  const allIngredients = useTypesSelector(
    (state) => state.allIngredientsReducer.allIngredients
  );

  const { idModal } = useParams();

  const ingredient = allIngredients.find(
    (el: IIngredientType) => el._id === idModal
  );

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

  return (
    <div className={styles.ingredient}>
      <img
        className="pb-4"
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <h2
        data-testid="ingredient-modal-name"
        className={`${styles.text} text text_type_main-medium pb-8`}
      >
        {ingredient.name}
      </h2>
      <ul className={styles.list}>
        <li className="pr-5">
          <IngredientInfo title="Калории, ккал" count={ingredient.calories} />
        </li>
        <li className="pr-5">
          <IngredientInfo title="Белки, г" count={ingredient.proteins} />
        </li>
        <li className="pr-5">
          <IngredientInfo title="Жиры, г" count={ingredient.fat} />
        </li>
        <li>
          <IngredientInfo
            title="Углеводы, г"
            count={ingredient.carbohydrates}
          />
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
