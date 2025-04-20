import React from 'react';

import Logo from "assets/pictures/Union.png";
import { sendLogin } from 'services/Auth';

import styles from "./LoginForm.module.css";
import { useNavigate } from 'react-router-dom';
import setCookie from 'src/utils/cookie';

const LoginForm = ({
                    username,
                    setUserName,
                    password,
                    setPassword,
                    setStep
                    }) => {
    
    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();
        
        const { response, error } = await sendLogin(username, password);
        setCookie(response.data.token)
        console.log(response.data.token)
        
        if (response) {
        navigate("/"); 
        }

        // if (error) console.log(error.response.data.message);
    };

    const confirmHandler = () => {
        setStep(1);
        setUserName("");
        setPassword("");
    }

    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <img src={Logo} />
            <p>ورود</p>
            <input
                type="text"
                id='username'
                placeholder='نام کاربری'
                value={username}
                onChange={e => setUserName(e.target.value)}
            />
            <input 
                type="password"
                id='password'
                placeholder='رمز عبور'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button type='submit'>ورود</button>
            <a onClick={confirmHandler}>ایجاد حساب کاربری!</a>
        </form>
    );
};

export default LoginForm;