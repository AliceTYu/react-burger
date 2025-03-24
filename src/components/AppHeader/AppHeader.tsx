import { useLocation } from "react-router-dom";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import styles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useTypesSelector } from "../../services/reducers";

function AppHeader(): JSX.Element {
  const location = useLocation();
  const userLogin = useTypesSelector((state) => state.loginEmailReducer.user);

  const isProfileActive = location.pathname.startsWith("/profile");

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.container}>
        <div className={styles.headerMenu}>
          <ButtonIcon toLink={"/"} text={"Конструктор"}>
            <BurgerIcon
              type={location.pathname === "/" ? "primary" : "secondary"}
            />
          </ButtonIcon>
          <ButtonIcon toLink={"/feed"} text={"Лента заказов"}>
            <ListIcon
              type={location.pathname === "/feed" ? "primary" : "secondary"}
            />
          </ButtonIcon>
        </div>

        <div className={styles.headerLogo}>
          <Logo />
        </div>

        <div className={styles.headerProf}>
          <ButtonIcon
            isProfileActive={isProfileActive}
            toLink={"/profile"}
            text={userLogin ? userLogin.name : "Личный кабинет"}
          >
            <ProfileIcon type={isProfileActive ? "primary" : "secondary"} />
          </ButtonIcon>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
