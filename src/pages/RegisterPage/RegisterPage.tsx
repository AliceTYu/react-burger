import styles from "./RegisterPage.module.css";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  registEmail,
  registName,
  registPassword,
} from "../../services/actions/regisrtation";
import { registerEmail } from "../../utils/api";
import { ChangeEvent, FormEvent } from "react";

function RegisterPage() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // @ts-ignore
  const emailReg = useSelector((state) => state.registrationEmailReducer.email);
  const passReg = useSelector(
    // @ts-ignore
    (state) => state.registrationEmailReducer.password
  );
  // @ts-ignore
  const nameReg = useSelector((state) => state.registrationEmailReducer.name);
  // @ts-ignore
  const errorReg = useSelector((state) => state.registrationEmailReducer.error);

  function onChangeName(e: ChangeEvent<HTMLInputElement>) {
    dispatch(registName(e.target.value));
  }

  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    dispatch(registPassword(e.target.value));
  }

  function onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    dispatch(registEmail(e.target.value));
  }

  function registerPerson(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // @ts-ignore
    dispatch(registerEmail(emailReg, passReg, nameReg));

    navigate(from, { replace: true });
  }

  return (
    <form className={styles.registr} onSubmit={registerPerson}>
      <div className={`text text_type_main-medium pb-6`}>Регистрация</div>
      {errorReg && (
        <div className={`${styles.error} text text_type_main-small pb-6`}>
          {errorReg}
        </div>
      )}
      {
        // @ts-ignore
        <Input
          type="text"
          placeholder="Имя"
          extraClass="pb-6"
          onChange={onChangeName}
          value={nameReg}
        />
      }
      {
        // @ts-ignore
        <Input
          type="email"
          placeholder="E-mail"
          extraClass="pb-6"
          onChange={onChangeEmail}
          value={emailReg}
        />
      }
      {
        // @ts-ignore
        <Input
          type="password"
          placeholder="Пароль"
          icon="ShowIcon"
          extraClass="pb-6"
          onChange={onChangePassword}
          value={passReg}
        />
      }
      <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
        Зарегистрироваться
      </Button>
      <div
        className={`text text_type_main-default text_color_inactive pt-20 pb-4`}
      >
        Уже зарегистрированы?
        <Link className={`${styles.link} pl-2`} to={"/login"}>
          Войти
        </Link>
      </div>
    </form>
  );
}

export default RegisterPage;
