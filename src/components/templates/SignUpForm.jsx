import React, { useState } from 'react';

import Logo from "assets/pictures/Union.png";
import { sendRegister } from 'services/auth';

import styles from "./SignUpForm.module.css";
import validateForm from 'src/helpers/validation';

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

        const validationErrors = await validateForm(username, password, confirmPassword);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length ===0 ) {
            const { response, error } = await sendRegister(username, password);
            if (response) {
            setStep(2);
            } else {
                console.log(error)
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
                <img src={Logo} />
                <p>فرم ثبت نام</p>
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
                {errors.emptyField && (
                <span className={styles.errorText}>{errors.emptyField}</span>)}
                <a onClick={confirmHandler}>حساب کاربری دارید؟</a>
            </div>
        </form>
    );
};

export default SignUpForm;