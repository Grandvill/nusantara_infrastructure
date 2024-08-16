import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/dashboard'); // Arahkan ke halaman dashboard setelah login berhasil
  };

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginPage;
