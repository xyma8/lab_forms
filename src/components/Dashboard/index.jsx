import "./style.css"
import React, { useState } from 'react';

const Dashboard = ({ login }) => {
    const [darkMode, setDarkMode] = useState(getCurrentTheme());

    function getCurrentTheme() {
        return false
    }

    return(
        <div className="dashboard">
             <p>Welcome, {login}</p>
             <button>Переключить тему</button>
             <button>Выход</button>
        </div>    
    )
}

export default Dashboard