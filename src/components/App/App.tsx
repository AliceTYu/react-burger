import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.appMain}>
        <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
        <div className={styles.appBlock}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </div>
      </main>
    </div>
  );
}

export default App;
