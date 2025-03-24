import { NavLink, Outlet } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import { exitLogin } from "../../utils/api";
import { useDispatch } from "../..";

function ProfilePage() {
  const dispatch = useDispatch();

  const exitClick = () => {
    dispatch(exitLogin());
  };

  return (
    <div className={styles.profile}>
      <div className={`${styles.profileMenu} pr-15`}>
        <nav className={`pb-20`}>
          <ul
            className={`${styles.list} text text_type_main-medium text_color_inactive`}
          >
            <li>
              <NavLink
                to={"/profile"}
                className={({ isActive }) =>
                  isActive ? styles.isActive : "text_color_inactive"
                }
                end
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/profile/orders"}
                className={({ isActive }) =>
                  isActive ? styles.isActive : "text_color_inactive"
                }
              >
                История заказов
              </NavLink>
            </li>
            <li>
              {
                // @ts-ignore
                <NavLink
                  onClick={exitClick}
                  className={`${styles.logoutButton}`}
                >
                  Выход
                </NavLink>
              }
            </li>
          </ul>
        </nav>
        <div className={`text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </div>
      <div className={styles.outletBlock}>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfilePage;
