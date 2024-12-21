import styles from './Profile.module.css';

import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveChange } from '../../utils/api';

function Profile() {
    const dispatch = useDispatch()

    const [visibleButton, setVisibleButton] = useState(false)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const nameReg = useSelector(state => state.loginEmailReducer.user.name)
    const emailReg = useSelector(state => state.loginEmailReducer.user.email)
    const passReg = useSelector(state => state.loginEmailReducer.password)

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

    const onChangeName = (e) => {
        setName(e.target.value);
        setVisibleButton(true);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setVisibleButton(true);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setVisibleButton(true);
    }

    const savePerson = () => {
        dispatch(saveChange(name, email, password));
        setVisibleButton(false);
    }

    const cancleSave = () => {
        setName(nameReg);
        setEmail(emailReg);
        setPassword(passReg);
        setVisibleButton(false)
    }

    return (
        <form>
            <Input icon={'EditIcon'} onChange={onChangeName} type='text' placeholder='Имя' extraClass='pb-6' value={name} />
            <Input icon={'EditIcon'} onChange={onChangeEmail} type='email' placeholder='E-mail' extraClass='pb-6' value={email} />
            <Input icon={'EditIcon'} onChange={onChangePassword} type='password' placeholder='Пароль' extraClass='pb-6' value={password} />
            <div className={styles.btnBlock}>
                {visibleButton && <Button htmlType="button" type="secondary" size="medium" extraClass="ml-2" onClick={cancleSave}>
                    Отменить
                </Button>}
                {visibleButton && <Button htmlType="button" type="primary" size="medium" extraClass="ml-2" onClick={savePerson}>
                    Сохранить
                </Button>}
            </div>
        </form>
    )
}

export default Profile;