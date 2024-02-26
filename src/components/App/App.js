import "./App.css"
import React, { useState } from 'react';
import ContainerForm from "../ContainerForm";
import LoginForm from "../LoginForm";
import Dashboard from "../Dashboard";


function App() {
  const [step, setStep] = useState('register');

  const goToRegister = () => {
    setStep('register');
  };

  const goToLogin = () => {
    setStep('login');
  };

  // Функция для переключения шага на личный кабинет
  const goToDashboard = () => {
    setStep('dashboard');
    console.log('dashboard');
  };

  return (
    <div className="App">

      {step === 'register' && (
      <div className="form-container">
        <ContainerForm onSuccess={goToLogin}/>
        <button onClick={goToLogin}>Уже зарегистрированы? Войти</button>
      </div>
      )}

      {step === 'login' && (
        <div className="login-form">
          <LoginForm onSuccess={goToDashboard} />
          <button onClick={goToRegister}>Нет аккаунта? Зарегистрировать</button>
        </div>
      )}

      {step === 'dashboard' && (
        <div className="dashboard">
          <Dashboard />
        </div>
      )}

    </div>
  );
}

export default App;
