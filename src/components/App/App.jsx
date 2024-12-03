import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { DEL_CURRENT_INGREDIENT } from '../../services/actions/currentIngredient';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DEL_NUMBER } from '../../services/actions/order';

function App() {
  const [visibleModal, setVisibleModal] = useState(false)
  const [viewModal, setViewModal] = useState('order')

  const dispatch = useDispatch()

  const modalClose = () => {
    setVisibleModal(false)
    dispatch({ type: DEL_CURRENT_INGREDIENT })
    dispatch({ type: DEL_NUMBER })
  }

  const modalOpen = (type) => {
    if (type === 'order') {
      setViewModal('order')
    } else if (type === 'ingred') {
      setViewModal('ingred')
    }
    setVisibleModal(true)
  }

  const modal = (
    <>
      {viewModal === 'order' && (
        <Modal onClose={modalClose}>
          <OrderDetails />
        </Modal>)}
      {viewModal === 'ingred' && (
        <Modal header='Детали ингредиента' onClose={modalClose}>
          <IngredientDetails />
        </Modal>)}
    </>
  );

  return (
    <>
      <div className={styles.app}>
        <AppHeader />

        <main className={styles.appMain}>
          <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
          <div className={styles.appBlock}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients onClick={() => modalOpen('ingred')} />
              <BurgerConstructor onClick={() => modalOpen('order')} />
            </DndProvider>
          </div>
        </main>
      </div>
      <div className={styles.modal}>
        {visibleModal && modal}
      </div>
    </>
  );
}

export default App;
