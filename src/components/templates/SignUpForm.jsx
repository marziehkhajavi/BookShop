import React, { useState } from 'react';

import Logo from "assets/pictures/Union.png";
import { sendRegister } from 'services/auth';

import styles from "./SignUpForm.module.css";
import toast from 'react-hot-toast';
import { messages } from 'src/utils/messages';
import { SignUpValidateForm } from 'src/helpers/validation';
import { Link } from 'react-router-dom';

const SignUpForm = ({setStep,
                     username,
                     setUserName,
                     password,
                     setPassword,
                     confirmPassword,
                     setConfirmPassword
                    }) => {

    const [errors, setErrors] = useState({});

    const submitHandler = async (event) => {
        event.preventDefault();

        const validationErrors = await SignUpValidateForm(username, password, confirmPassword);
        await setErrors(validationErrors);
        if (Object.keys(validationErrors).length !== 0) {
            toast.error(messages.error.signup);
        };

        if (Object.keys(validationErrors).length === 0 ) {
            const { response, error } = await sendRegister(username, password);
            if (response) {
                toast.success(messages.success.signup);
                setStep(2);
                console.log("API:", VITE_BASE_URL)
            }
        };
    };

    const confirmHandler = () => {
        setStep(2);
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
                    <input 
                        type="password"
                        id='confirmPassword'
                        placeholder='تکرار رمز عبور'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && (
                    <span className={styles.errorText}>{errors.confirmPassword}</span>)}
                <button type='submit'>ثبت نام</button>
                </div>
                <a onClick={confirmHandler}>حساب کاربری دارید؟</a>
            </div>
        </form>
    );
};

export default SignUpForm;