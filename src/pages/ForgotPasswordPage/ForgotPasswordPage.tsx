import { Link, useNavigate } from "react-router-dom";
import styles from "./ForgotPasswordPage.module.css";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import { forgotEmail } from "../../utils/api";

function ForgotPasswordPage() {
  const [emailVal, setEmailVal] = useState<string>("");
  const navigate = useNavigate();

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("ForgotPasswordId", "1");
    console.log(emailVal);
    const response = await forgotEmail(emailVal);

    if (response) {
      navigate("/reset-password");
    }
  };

  return (
    <form className={styles.forgot} onSubmit={sendEmail}>
      <div className={`text text_type_main-medium pb-6`}>
        Восстановление пароля
      </div>
      {
        // @ts-ignore
        <Input
          type="email"
          placeholder="Укажите e-mail"
          extraClass="pb-6"
          onChange={(e) => setEmailVal(e.target.value)}
          value={emailVal}
        />
      }
      <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
        Восстановить
      </Button>
      <div
        className={`text text_type_main-default text_color_inactive pt-20 pb-4`}
      >
        Вспомнили пароль?
        <Link className={`${styles.link} pl-2`} to={"/login"}>
          Войти
        </Link>
      </div>
    </form>
  );
}

export default ForgotPasswordPage;
