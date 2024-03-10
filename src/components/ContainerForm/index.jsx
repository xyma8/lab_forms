import "./style.css";
import { useForm } from "react-hook-form";

const ContainerForm = ({onSuccess}) => {
    const {register, handleSubmit, formState: {errors}, getValues } = useForm({mode: 'onBlur'});
    
    const onSubmit = (data) =>  {
        console.log(data);
        sendDataRegistration(data);
    }

    function sendDataRegistration(data) {
        fetch("http://formserver.ru/registration/", {
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

            if(response.status == 1){
                //onSuccess();nothing
            }
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
                    <input type="radio" name="gender" value="m" checked='checked' {...register("gender")}/>
                    Мужской
                </label>
                <br/>
                <label>
                    <input type="radio" name="gender" value="f" {...register("gender")}/>
                    Женский
                </label>
                </div>
            </fieldset>


            <label>
                Принимаю правила сайта: <input type="checkbox" name="checkboxAccept" {...register("acceptCB" , {required: 'Обязательно'})}/>
            </label>
            {errors?.acceptCB && (<div style={{ color: 'red', fontSize:'12px'}}>{errors.acceptCB.message}</div>)}


            <button type="submit">Регистрация</button>
        </form>
        
    )
}

export default ContainerForm