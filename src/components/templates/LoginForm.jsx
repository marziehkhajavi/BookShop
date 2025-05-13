import React, { useState } from 'react';
import toast from 'react-hot-toast';

import Logo from "assets/pictures/Union.png";
import { sendLogin } from 'services/auth';

import styles from "./LoginForm.module.css";
import { Link, useNavigate } from 'react-router-dom';
import {setCookie} from 'src/utils/cookie';
import { LoginValidateForm } from 'src/helpers/validation';
import { messages } from 'src/utils/messages';

const LoginForm = ({
                    username,
                    setUserName,
                    password,
                    setPassword,
                    setStep
                    }) => {

    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();
        
        const validationErrors = await LoginValidateForm(username, password);
        await setErrors(validationErrors);
        if (Object.keys(validationErrors).length !== 0) {
            toast.error(messages.error.login);
        };

        if (Object.keys(validationErrors).length === 0 ) {
            const { response } = await sendLogin(username, password);
            setCookie(response.data.token, username);
            if (response) {
                navigate("/"); 
                toast.success(messages.success.login);
            }
        };
        
        // if (error) console.log(error.response.data.message);
    };

    const confirmHandler = () => {
        setStep(1);
        setUserName("");
        setPassword("");
    }

    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <header className={styles.header}>
                <div>
                    <Link to="/"><img src={Logo} /></Link>
                    <p>فرم ثبت نام</p>
                </div>
            </header>
            <div className={styles.formBody}>
                <div className={styles.formField}>
                    <input
                        type="text"
                        id='username'
                        placeholder='نام کاربری'
                        value={username}
                        onChange={e => setUserName(e.target.value)}
                    />
                    {errors.username && (
                    <span className={styles.errorText}>{errors.username}</span>)}
                    <input 
                        type="password"
                        id='password'
                        placeholder='رمز عبور'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {errors.password && (
                    <span className={styles.errorText}>{errors.password}</span>)}
                    <button type='submit'>ورود</button>
                </div>
            </div>
            {errors.emptyField && (
            <span className={styles.errorText}>{errors.emptyField}</span>)}
            <a onClick={confirmHandler}>ایجاد حساب کاربری!</a>
        </form>
    );
};

export default LoginForm;