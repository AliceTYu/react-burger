import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./LiConstructor.module.css";
import {
  delIngredients,
  updateSortIngredients,
} from "../../services/actions/currentIngredients";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { IIngredientType } from "../../utils/types";
import { useDispatch } from "../..";
import { useTypesSelector } from "../../services/reducers";

interface propTypes {
  index: number;
  currentEl: IIngredientType;
}

interface DragItem {
  id: string;
  index: number;
}

function LiConstructor({ currentEl, index }: propTypes): JSX.Element {
  const dispatch = useDispatch();
  const choiceIngredients = useTypesSelector(
    (state) => state.currentIngredients.ingredients
  );

  const ref = useRef(null);

  function deleteIng(id: string) {
    dispatch(delIngredients(id));
  }

  const [, dragEl] = useDrag({
    type: "mainsouse",
    item: { id: currentEl.id, index },
  });

  const [, dropEl] = useDrop<DragItem, void, unknown>({
    accept: "mainsouse",
    hover(item) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const updatedCards = [...choiceIngredients];
    const [removed] = updatedCards.splice(dragIndex, 1);
    updatedCards.splice(hoverIndex, 0, removed);
    dispatch(updateSortIngredients(updatedCards));
  };

  dragEl(dropEl(ref));
  return (
    <li
      ref={currentEl.type === "bun" ? null : ref}
      key={currentEl.id}
      className={`${styles.item} pb-4`}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={currentEl.name}
        price={currentEl.price}
        thumbnail={currentEl.image_mobile}
        handleClose={() => deleteIng(currentEl.id)}
      />
    </li>
  );
}

export default LiConstructor;
