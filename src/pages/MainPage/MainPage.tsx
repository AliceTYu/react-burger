import styles from "./MainPage.module.css";

import { DndProvider } from "react-dnd";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { delCurrentIngredients } from "../../services/actions/currentIngredient";
import { DEL_NUMBER } from "../../services/actions/order";
import Modal from "../../components/Modal/Modal";
import OrderDetails from "../../components/OrderDetails/OrderDetails";

function MainPage() {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<"order">("order");

  const dispatch = useDispatch();

  const modalClose = () => {
    setVisibleModal(false);
    dispatch(delCurrentIngredients());
    dispatch({ type: DEL_NUMBER });
  };

  const modalOpen = (type: "order") => {
    if (type === "order") {
      setViewModal("order");
    }
    setVisibleModal(true);
  };

  const modal = (
    <>
      {viewModal === "order" && (
        <Modal onClose={modalClose}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );

  return (
    <>
      <h1 className={`text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      <div className={styles.appBlock}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor onClick={() => modalOpen("order")} />
        </DndProvider>
      </div>
      <div className={styles.modal}>{visibleModal && modal}</div>
    </>
  );
}

export default MainPage;
