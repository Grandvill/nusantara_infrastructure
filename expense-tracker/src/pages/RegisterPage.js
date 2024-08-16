import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate('/login'); // Arahkan ke halaman login setelah registrasi berhasil
  };

  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
}

export default RegisterPage;
