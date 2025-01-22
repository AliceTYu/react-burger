import styles from "./IngredientInfo.module.css";

interface propTypes {
  title: string;
  count: number;
}

function IngredientInfo({ title, count }: propTypes): JSX.Element {
  return (
    <div className={`${styles.ingredInfo}`}>
      <div className="text text_type_main-default text_color_inactive">
        {title}
      </div>
      <div className="text text_type_digits-default text_color_inactive">
        {count}
      </div>
    </div>
  );
}

export default IngredientInfo;
