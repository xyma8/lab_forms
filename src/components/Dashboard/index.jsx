import "./style.css"
import React, { useState } from 'react';

const Dashboard = ({ darkModeSetting }) => {
    const [darkMode, setDarkMode] = useState(getCurrentTheme());

    function getCurrentTheme() {
        return false
    }

    return(
        <div className="dashboard">
             <button>Переключить тему</button>
             <button>Выход</button>
        </div>    
    )
}

export default Dashboard