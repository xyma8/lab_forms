import "./style.css";
import ContainerForm from "../ContainerForm";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const RegistrationPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        checkCookie();

    }, []);

    function checkCookie() {
        if (Cookies.get('token')) { 
            navigate('/dashboard');
        }
    }

    function goToLogin() {
        navigate('/login');
    }

    return(
    <div className="RegistrationPage">
        <div className="form-container">
            <ContainerForm/>

            <button onClick={goToLogin}>Уже зарегистрированы? Войти</button>
        </div>
    </div>
    )
}

export default RegistrationPage