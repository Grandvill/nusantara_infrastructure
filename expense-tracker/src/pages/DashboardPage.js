import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseList from '../components/ExpenseList';

function DashboardPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      // Jika tidak ada token, arahkan kembali ke halaman login
      navigate('/login');
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {token ? <ExpenseList token={token} /> : <p>Loading...</p>}
    </div>
  );
}

export default DashboardPage;
