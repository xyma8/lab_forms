import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RegistrationPage/>,
  },
  {
    path: '/registration',
    element: <RegistrationPage/>
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/dashboard',
    element: <DashboardPage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


reportWebVitals();
