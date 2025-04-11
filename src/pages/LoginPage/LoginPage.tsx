import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./LoginPage.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginEmail, loginPassword } from "../../services/actions/auth";
import { loginEmailTh } from "../../utils/api";
import { ChangeEvent, FormEvent } from "react";
import { useDispatch } from "../..";
import { useTypesSelector } from "../../services/reducers";

function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const emailLog = useTypesSelector((state) => state.loginEmailReducer.email);
  const passLog = useTypesSelector((state) => state.loginEmailReducer.password);
  const errorLog = useTypesSelector((state) => state.loginEmailReducer.error);

  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    dispatch(loginPassword(e.target.value));
  }

  function onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    dispatch(loginEmail(e.target.value));
  }

  function loginEmailClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(loginEmailTh(emailLog, passLog));

    navigate(from, { replace: true });
  }

  return (
    <form className={styles.login} onSubmit={loginEmailClick}>
      <div className={`text text_type_main-medium pb-6`}>Вход</div>
      {errorLog && (
        <div className={`${styles.error} text text_type_main-small pb-6`}>
          {errorLog}
        </div>
      )}
      {
        // @ts-ignore
        <Input
          type="email"
          placeholder="E-mail"
          extraClass="pb-6"
          onChange={onChangeEmail}
          value={emailLog}
          data-testid="email_inp"
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
          value={passLog}
          data-testid="password_inp"
        />
      }
      <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
        Войти
      </Button>
      <div
        className={`text text_type_main-default text_color_inactive pt-20 pb-4`}
      >
        Вы — новый пользователь?
        <Link className={`${styles.link} pl-2`} to={"/register"}>
          Зарегистрироваться
        </Link>
      </div>
      <div className={`text text_type_main-default text_color_inactive`}>
        Забыли пароль?
        <Link className={`${styles.link} pl-2`} to={"/forgot-password"}>
          Восстановить пароль
        </Link>
      </div>
    </form>
  );
}

export default LoginPage;
