import "./style.css"
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import API from "../Utils/API";

const LoginForm = ({ setLogin, onSuccess }) => {
    const {register, handleSubmit, formState: {errors} } = useForm({mode: 'onBlur'});
    //const { theme, setTheme } = useTheme(); //проблема с пересеканием css

    const onSubmit = (data) =>  {
        console.log(data);
        sendDataAuthorization(data);
    }

    /*Old
    function sendDataAuthorization(data) {
        fetch("http://localhost:8080/api/users/login", {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json; charset=utf-8',
            },
            body: JSON.stringify(data)
        })
        .then (response => {
            if(response.status == 401) {
                throw new Error("Incorrect login or password");
            }
            else if(response.status != 200) {
                throw new Error("Error");
            }
            return response.text();
        })
        .then(token =>{
            console.log(token);
            onSuccess(data.login, token);
        })
    }
    */

    function sendDataAuthorization(data) {
        API.post("/users/login", data)
        .then(response => {
            onSuccess(data.login, response.data.token);
        })
        .catch(error =>{
            console.error(error);
            if(error.response.status == 401) {
                alert("Incorrect login or password");
            }
            else if(error.response.status != 200) {
                alert("Error");
            }
        })
    }


    return(
        <form className="main-form" onSubmit={handleSubmit(onSubmit)}>

            {errors?.login && (<div style={{ color: 'red', fontSize:'12px'}}>{errors.login.message}</div>)}
            <input type="text" placeholder="Логин" autoComplete="off"
                {
                    ...register("login", {
                        required: 'Обязательное поле',
                        minLength: {value:6, message:"Минимум 6"},
                        maxLength: {value:32, message:"Максимум 32"},
                        pattern: {
                            value: /^[a-zA-Z0-9_]+$/ ,
                            message: "Неправильный логин"
                        }
                    })
                }
            />

            {errors?.password && (<div style={{ color: 'red', fontSize:'12px'}}>{errors.password.message}</div>)}
            <input type="password" placeholder="Пароль" autoComplete="off"
                {
                    ...register("password", {
                        required: 'Обязательное поле',
                        minLength: {value:8, message:"Минимум 8"},
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,}$/ , 
                            message:"Необходимо прописные, заглавные буквы, цифры и разрешенные символы"
                        }
                    })
                }
            />


            <button type="submit">Войти</button>
        </form>
    )
}

export default LoginForm