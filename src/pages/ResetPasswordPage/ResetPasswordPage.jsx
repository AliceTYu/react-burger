import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ResetPasswordPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { resetPasswordProfile } from '../../utils/api';

function ResetPasswordPage() {
    const [passVal, setPassVal] = useState('')
    const [codeVal, setCodeVal] = useState('')
    const navigate = useNavigate()

    const onChange = (e) => {
        setPassVal(e.target.value)
    }

    const onChangeCode = (e) => {
        setCodeVal(e.target.value)
    }

    const resetPassword = async (e) => {
        e.preventDefault();
        const response = await resetPasswordProfile(passVal, codeVal)
        localStorage.removeItem('ForgotPasswordId')

        if (response) {
            navigate('/login');
        }
    }

    return (
        <form className={styles.reset} onSubmit={resetPassword}>
            <div className={`text text_type_main-medium pb-6`}>Восстановление пароля</div>
            <Input onChange={onChange} value={passVal} type='password' placeholder='Введите новый пароль' extraClass='pb-6' />
            <Input onChange={onChangeCode} value={codeVal} type='text' placeholder='Введите код из письма' extraClass='pb-6' />
            <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
                Сохранить
            </Button>
            <div className={`text text_type_main-default text_color_inactive pt-20 pb-4`}>Вспомнили пароль?
                <Link className={`${styles.link} pl-2`} to={'/login'}>Войти</Link>
            </div>
        </form>
    )
}

export default ResetPasswordPage;