import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PriceBlock from "../PriceBlock/PriceBlock";
import styles from "./CardBlock.module.css";
import { IIngredientType } from "../../utils/types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

interface propTypes {
  elDataBase: IIngredientType;
  type: string;
  onClick?: () => void;
}

function CardBlock({ type, elDataBase, onClick }: propTypes): JSX.Element {
  const location = useLocation();

  const choiceIngredients = useSelector(
    // @ts-ignore
    (state) => state.currentIngredients.ingredients
  );
  // @ts-ignore
  const choiceBun = useSelector((state) => state.currentIngredients.bun);

  const [, dragRef] = useDrag({
    type: type === "bun" ? "bun" : "sauseMain",
    item: elDataBase,
  });

  const countIngredients = useMemo(() => {
    if (!elDataBase) {
      return 0;
    }
    let count = 0;

    if (choiceBun?._id === elDataBase._id) {
      count += 2;
    }

    count += choiceIngredients.filter(
      (el: IIngredientType) => el._id === elDataBase._id
    ).length;

    return count;
  }, [choiceIngredients, choiceBun]);

  return (
    <>
      <Link
        state={{ background: location }}
        to={`/ingredients/${elDataBase._id}`}
        onClick={onClick}
        ref={dragRef}
        id={elDataBase._id}
        className={styles.cardBlock}
      >
        {countIngredients > 0 && (
          <div className={styles.cardCount}>
            <Counter count={countIngredients} size="default" extraClass="m-1" />
          </div>
        )}
        <img src={elDataBase.image} alt={`${elDataBase.name}.`} />
        <PriceBlock price={elDataBase.price} fsize={1} />
        <div className={`${styles.title} text text_type_main-default`}>
          {elDataBase.name}
        </div>
      </Link>
    </>
  );
}

export default CardBlock;
