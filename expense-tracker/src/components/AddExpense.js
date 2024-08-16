import React, { useState } from 'react';
import { addExpense } from './api';

const ExpenseForm = () => {
  const [walletId, setWalletId] = useState(1);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [amount, setAmount] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addExpense(walletId, name, categoryId, amount, time);
      console.log('Expense added successfully:', response.data);
    } catch (error) {
      console.error('Error adding expense:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Expense Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Category ID" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input type="datetime-local" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
