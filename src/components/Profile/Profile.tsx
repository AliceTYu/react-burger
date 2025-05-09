import styles from "./Profile.module.css";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, useEffect, useState } from "react";
import { saveChange } from "../../utils/api";
import { useDispatch } from "../..";
import { useTypesSelector } from "../../services/reducers";
import { IUserr } from "../../utils/types";

function Profile() {
  const dispatch = useDispatch();

  const [visibleButton, setVisibleButton] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const nameReg = useTypesSelector(
    (state) => (state.loginEmailReducer.user as IUserr).name
  );
  const emailReg = useTypesSelector(
    (state) => (state.loginEmailReducer.user as IUserr).email
  );

  const passReg = useTypesSelector((state) => state.loginEmailReducer.password);

  useEffect(() => {
    setName(nameReg);
    setEmail(emailReg);
    setPassword(passReg);
  }, [nameReg, emailReg, passReg]);

  useEffect(() => {
    if (name === nameReg && email === emailReg && password === passReg) {
      setVisibleButton(false);
    }
  }, [name, email, password]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setVisibleButton(true);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setVisibleButton(true);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setVisibleButton(true);
  };

  const savePerson = () => {
    dispatch(saveChange(name, email, password));
    setVisibleButton(false);
  };

  const cancleSave = () => {
    setName(nameReg);
    setEmail(emailReg);
    setPassword(passReg);
    setVisibleButton(false);
  };

  return (
    <form>
      {
        // @ts-ignore
        <Input
          icon={"EditIcon"}
          onChange={onChangeName}
          type="text"
          placeholder="Имя"
          extraClass="pb-6"
          value={name}
        />
      }
      {
        // @ts-ignore
        <Input
          icon={"EditIcon"}
          onChange={onChangeEmail}
          type="email"
          placeholder="E-mail"
          extraClass="pb-6"
          value={email}
        />
      }
      {
        // @ts-ignore
        <Input
          icon={"EditIcon"}
          onChange={onChangePassword}
          type="password"
          placeholder="Пароль"
          extraClass="pb-6"
          value={password}
        />
      }
      <div className={styles.btnBlock}>
        {visibleButton && (
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="ml-2"
            onClick={cancleSave}
          >
            Отменить
          </Button>
        )}
        {visibleButton && (
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="ml-2"
            onClick={savePerson}
          >
            Сохранить
          </Button>
        )}
      </div>
    </form>
  );
}

export default Profile;
