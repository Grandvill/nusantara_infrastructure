import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default HomePage;
