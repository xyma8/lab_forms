import "./style.css";
import { useState } from "react";
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import API from "../Utils/API";

const ContainerForm = ({onSuccess}) => {
    const {register, handleSubmit, formState: {errors}, getValues } = useForm({mode: 'onBlur'});
    const [captcha, setCaptcha] = useState(null);
    

    const onSubmit = (data) =>  {
        console.log(data);
        const user_data = {
            name: data.name,
            surname: data.surname,
            email: data.email,
            login: data.login,
            password: data.password,
            gender: parseInt(data.gender),
            darktheme: 0,
            token: ""
        }
        sendDataRegistration(user_data);
    }

    function sendDataRegistration(data) {
        API.post("/users/signup", data)
        .then(response => {
            alert('Registration success!');
        })
        .catch(error => {
            if(error.response.status==409) {
                alert("This login is already taken!");
            }
            else{
                alert("Error!");
            }
        })
    }

    function handleCaptchaChange(val) {
        setCaptcha(val);
        checkCaptcha();
    }

    function checkCaptcha(val) {
        API.get("/recaptcha", {
            headers: {
                'TokenAuth': val
            }
        })
        .then(response => {
            setCaptcha(true);
        })
        .catch(error => {
            setCaptcha(false);
        })
    }

    return(
        <form className="main-form" onSubmit={handleSubmit(onSubmit)}>
             
            {errors?.name && (<div style={{ color: 'red', fontSize:'12px'}}>{errors.name.message}</div>)}
            <input type="text" placeholder="Имя" autoComplete="off"
                {
                    ...register("name", {
                        required: 'Обязательное поле',
                        minLength: {value:2, message:"Минимум 2" },
                        maxLength: {value:15, message:"Максимум 15"},
                        pattern: {value:/^[а-яА-ЯёЁ]+$/ , message:"Неправильное имя"}
                    })
                }
            />
           

           {errors?.surname && (<div style={{ color: 'red', fontSize:'12px'}}>{errors.surname.message}</div>)}
            <input type="text" placeholder="Фамилия" autoComplete="off"
                {
                    ...register("surname", {
                        required: 'Обязательное поле',
                        minLength: {value:2, message:"Минимум 2"},
                        maxLength: {value:15, message:"Максимум 15"},
                        pattern: {value:/^[а-яА-ЯЁё]+(?:-[а-яА-ЯЁё]+)?$/ , message:"Неправильная фамилия"}
                    })
                }
            />
            

            {errors?.email && (<div style={{ color: 'red', fontSize:'12px'}}>{errors.email.message}</div>)}
            <input type="text" placeholder="Email" autoComplete="off"
                {
                    ...register("email", {
                        required: 'Обязательное поле',
                        maxLength: {value:254, message:"Превышена длина email"},
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,
                            message:"Неправильный email"
                        }
                    })
                }
            />


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


            {errors?.passwordConfirm && (<div style={{ color: 'red', fontSize:'12px'}}>{errors.passwordConfirm.message}</div>)}
            <input type="password" placeholder="Подтверждение пароля" autoComplete="off"
                {
                    ...register("passwordConfirm", {
                        required: 'Обязательное поле',
                        minLength: {value:8, message:"Минимум 8"},
                        validate: (value) => {
                            if (value !== getValues("password")) {
                              return "Пароли не совпадают";
                            }
                        }
                    })
                }
            />



            <fieldset>
                <legend>Как вы узнали о сайте?:</legend>
                <select {...register("source")}>
                    <option value="">--Выберите--</option>
                    <option value="search">Поисковые системы</option>
                    <option value="social">Социальные сети</option>
                    <option value="friends">Рекомендации друзей</option>
                    <option value="ads">Реклама</option>
                    <option value="blogs">Статьи и блоги</option>
                </select>
            </fieldset>


            <fieldset>
                <legend>Выберите пол:</legend>

                <div>                  
                <label>
                    <input type="radio" name="gender" value="0" checked='checked' {...register("gender")}/>
                    Мужской
                </label>
                <br/>
                <label>
                    <input type="radio" name="gender" value="1" {...register("gender")}/>
                    Женский
                </label>
                </div>
            </fieldset>


            <label>
                Принимаю правила сайта: <input type="checkbox" name="checkboxAccept" {...register("acceptCB" , {required: 'Обязательно'})}/>
            </label>
            {errors?.acceptCB && (<div style={{ color: 'red', fontSize:'12px'}}>{errors.acceptCB.message}</div>)}

            <ReCAPTCHA sitekey="6LfLkJUpAAAAACpHdRdR4FITqQQKPmCs21oJ8_2L"
            onChange={checkCaptcha}/>
        
            <button type="submit" >Регистрация</button>
        </form>
        
    )
}

export default ContainerForm