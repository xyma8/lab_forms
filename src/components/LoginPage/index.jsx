import "./style.css";
import LoginForm from "../LoginForm";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const navigate = useNavigate();

    function successLogin(login, token) {
        console.log(login);
        Cookies.set('token', token);
        navigate('/dashboard');
    }

    function goToRegister() {
        navigate('/registration');
    }

    function getToken() {

    }

    return(
    <div className="login-form">
        <LoginForm onSuccess={successLogin} />
        <button onClick={goToRegister}>Нет аккаунта? Зарегистрировать</button>
    </div>
    )
}


export default LoginPage;