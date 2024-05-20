import "./style.css"
import React, { useEffect } from 'react';
import { useState } from "react";
import { useTheme } from '../../hooks/use-theme';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import API from "../Utils/API";

const DashboardPage = ({login}) => {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserData();

    }, []); // Пустой массив зависимостей означает, что этот эффект выполняется только при монтировании компонента

    useEffect(() => {
        if (userData) {
            //этот эффект запустится после каждого обновления userData
            selectTheme();
        }
    }, [userData]);



    function selectTheme() {
        API.get("/users/theme", {
            headers: {
                'TokenAuth': Cookies.get('token')
            }
        })
        .then(response => {
            if(response.data.darktheme == 0) {
                setTheme('light');
            }
            if(response.data.darktheme == 1) {
                setTheme('dark');
            }
        })
        .catch(error => {
            alert("Error theme");
        })
    }

    function exit() {
        Cookies.remove('token');
        navigate('/login');
    }

    function saveTheme() {
        API.get("/users/theme/change", {
            headers: {
                'TokenAuth': Cookies.get('token')
            }
        })
        .then(response => {
            console.log(response.data.darktheme);
            if(response.data.darktheme == 0) {
                setTheme('light');
            }
            if(response.data.darktheme == 1) {
                setTheme('dark');
            }
        })
        .catch(error => {
            alert("Error theme");
        })
    }

    function getUserData() {
        //проверяем есть ли токен в куках(конечно на сервере есть запасная проверка но тут лучше)
        if (!Cookies.get('token')) { 
            navigate('/login');
        }

        API.get("/users/data", {
            headers: {
                'TokenAuth': Cookies.get('token')
            }
        })
        .then(response => {
            setUserData(response.data);
        })
        .catch(error => {
            exit();
        })
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return(
        <div className="dashboard">
             <p>Welcome, {userData.login}</p>
             <button onClick={() => saveTheme()}>
                {theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
             </button>
             <button onClick={() => exit()}>Выход</button>
        </div>    
    )
}

export default DashboardPage;