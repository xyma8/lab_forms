import "./style.css"
import React, { useEffect } from 'react';
import { useState } from "react";
import { useTheme } from '../../hooks/use-theme';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const DashboardPage = ({login}) => {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const {userData, setUserData} = useState();

    useEffect(() => {
        getUserData();
        //selectTheme(login);

      }, []); // Пустой массив зависимостей означает, что этот эффект выполняется только при монтировании компонента

    
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
        window.location.reload();
    }

    function saveTheme(login) {
        fetch("http://formserver.ru/settings_profil/theme/", {
            method: 'POST',
            header: {
                'Content-type' : 'application/json; charset=utf-8',
            },
            body: JSON.stringify({code: 2, login:login})
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
        fetch("http://formserver.ru/user/data/", {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json; charset=utf-8',
                Authorization: `Bearer ${Cookies.get('token')}`
            },
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
    }


    return(
        <div className="dashboard">
             <p>Welcome, {login}</p>
             <button onClick={() => saveTheme(login)}>
                {theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
             </button>
             <button onClick={() => exit()}>Выход</button>
        </div>    
    )
}

export default DashboardPage;