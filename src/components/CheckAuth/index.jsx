import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CheckAutch = (Component) => {
    const navigate = useNavigate();

    function redirectToLogin() {
        navigate('/login');
    }

  return class extends React.Component {
    render() {
      // Проверка наличия токена в куки
      const token = Cookies.get('token');

      if (!token) {
        redirectToLogin();
      }

      return <Component {...this.props} />;
    }
  };
};

export default CheckAutch;