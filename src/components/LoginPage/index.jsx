import "./style.css";
import LoginForm from "../LoginForm";
import React, { useState } from 'react';

const LoginPage = () => {

    function successLogin(login) {
        console.log(login);
    }

    function goToRegister() {

    }

    return(
    <div className="login-form">
        <LoginForm onSuccess={successLogin} />
        <button onClick={goToRegister}>Нет аккаунта? Зарегистрировать</button>
    </div>
    )
}


export default LoginPage;