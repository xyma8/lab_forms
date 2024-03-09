import "./style.css";
import ContainerForm from "../ContainerForm";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const RegistrationPage = () => {
    const navigate = useNavigate();

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