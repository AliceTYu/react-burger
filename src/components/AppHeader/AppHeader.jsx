import ButtonIcon from '../ButtonIcon/ButtonIcon';
import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.container}>
        <div className={styles.headerMenu}>
          <ButtonIcon text={'Конструктор'}>
            <BurgerIcon type="primary" />
          </ButtonIcon>
          <ButtonIcon text={'Лента заказов'}>
            <ListIcon type="primary" />
          </ButtonIcon>
        </div>

        <div className={styles.headerLogo}>
          <Logo />
        </div>

        <div className={styles.headerProf}>
          <ButtonIcon text={'Личный кабинет'}>
            <ProfileIcon type="primary" />
          </ButtonIcon>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;