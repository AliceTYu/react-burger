import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { useEffect, useState } from 'react';
import { URL_BASE } from '../../utils/fileWithConstants';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';


function App() {
  const [dataBase, setDataBase] = useState([])
  const [visibleModal, setVisibleModal] = useState(false)
  const [viewModal, setViewModal] = useState('order')
  const [choiceIngredient, setChoiceIngredient] = useState([])

  useEffect(() => {
    getIngedients()
  }, [])

  const getIngedients = async () => {
    try {
      const response = await fetch(`${URL_BASE}ingredients`)
      if (!response.ok) {
        throw new Error('Ошибка запроса!')
      }
      const data = await response.json()
      setDataBase(data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const modalClose = () => {
    setVisibleModal(false)
    setChoiceIngredient(null)
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
          <IngredientDetails choiceIngredient={choiceIngredient} dataBase={dataBase} />
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
            <BurgerIngredients setChoiceIngredient={setChoiceIngredient} onClick={() => modalOpen('ingred')} dataBase={dataBase} />
            <BurgerConstructor onClick={() => modalOpen('order')} dataBase={dataBase} />
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
