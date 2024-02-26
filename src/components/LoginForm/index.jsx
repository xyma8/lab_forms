import "./style.css"
import { useForm } from "react-hook-form";

const LoginForm = ({ onSuccess }) => {
    const {register, handleSubmit, formState: {errors}, getValues } = useForm({mode: 'onBlur'});

    const onSubmit = (data) =>  {
        console.log(data);
        sendDataAuthorization(data);
    }

    function sendDataAuthorization(data) {
        fetch("http://formserver.ru/login/", {
            method: 'POST',
            header: {
                'Content-type' : 'application/json; charset=utf-8',
            },
            body: JSON.stringify(data)
        })
        .then (response => response.json())
        .then (response => {
            console.log(response)
            alert(response.message);

            if(response.status == 1) {
                onSuccess();
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
                        maxLength: {value:32, message:"Максимум 32"}
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