import React, { useState } from 'react';

import LoginForm from 'components/templates/LoginForm';
import SignUpForm from 'components/templates/SignUpForm';

const AuthPage = () => {
    const [step , setStep] = useState(1);
    const [username , setUserName] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");

    return (
        <div style={{display: "flex", justifyContent:"center", alignItems: "center"}}>
            {step === 1 && <SignUpForm 
                            setStep={setStep}
                            username={username}
                            setUserName={setUserName}
                            password={password}
                            setPassword={setPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                            />}
            {step === 2 && <LoginForm 
                            username={username}
                            setUserName={setUserName}
                            password={password}
                            setPassword={setPassword}
                            setStep={setStep}
                            />}
        </div>
    );
};

export default AuthPage;