import "./style.css"
import React, { useEffect } from 'react';
import { useState } from "react";
import { useTheme } from '../../hooks/use-theme';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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
            selectTheme(userData.login);
        }
    }, [userData]);

    
    function toggleTheme() {
        if(theme === 'dark') {
            setTheme('light');
            return;
        }
        else if(theme === 'light') {
            setTheme('dark');
        }
    }

    function selectTheme(login) {
        console.log(login);
        fetch("http://formserver.ru/settings_profil/theme/", {
              method: 'POST',
              header: {
                  'Content-type' : 'application/json; charset=utf-8',
              },
              body: JSON.stringify({code: 1, login:login})
          })
          .then (response => response.json())
          .then (response => {
            console.log(response);
              if(response.status == 0) {
                setTheme('light');
              }
              if(response.status == 1) {
                setTheme('dark');
              }
          })
    }

    function exit() {
        Cookies.remove('token');
        navigate('/login');
    }

    function saveTheme(login) {
        fetch("http://formserver.ru/settings_profil/theme/", {
            method: 'POST',
            header: {
                'Content-type' : 'application/json; charset=utf-8',
            },
            body: JSON.stringify({code:2, login:login})
        })
        .then (response => response.json())
        .then (response => {
          console.log(response);
            if(response.status == 1) {
              toggleTheme();
            }
        })
    }

    function getUserData() {
        /*
        fetch("http://formserver.ru/user/data/", {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json; charset=utf-8',
            },
            body: JSON.stringify({token:Cookies.get('token')})
        })
        .then (response => response.json())
        .then (response => {
            console.log(response)

            if(response.status == 1){
                setUserData(response);
            }
            else{
                navigate('/login');
            }
        })
        */

        //проверяем есть ли токен в куках(конечно на сервере есть запасная проверка но тут лучше)
        if (!Cookies.get('token')) { 
            navigate('/login');
        }

        fetch("http://formserver.ru/user/data/", {
            method: 'POST',
            header: {
                'Content-type' : 'application/json; charset=utf-8',
            },
            body: JSON.stringify({token:Cookies.get('token')})
        })
        .then (response => response.json())
        .then (response => {
          console.log(response);
            if(response.status == 1) {
                setUserData(response.message);
            }
            else{
                exit();
            }
        })
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return(
        <div className="dashboard">
             <p>Welcome, {userData.login}</p>
             <button onClick={() => saveTheme(userData.login)}>
                {theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
             </button>
             <button onClick={() => exit()}>Выход</button>
        </div>    
    )
}

export default DashboardPage;