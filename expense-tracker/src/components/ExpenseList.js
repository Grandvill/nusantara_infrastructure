// expenselist.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseList = ({ token, walletId }) => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: '', amount: '', category_id: '', time: '' });
  const [editingExpense, setEditingExpense] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`https://msib-6-test-7uaujedvyq-et.a.run.app/api/expense`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      setExpenses(response.data.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError('Failed to fetch expenses. Please check the API endpoint.');
    }
  };

  const handleAddExpense = async () => {
    try {
      const response = await axios.post(`https://msib-6-test-7uaujedvyq-et.a.run.app/api/wallet/:wallet_id/expense`, newExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      setExpenses([...expenses, response.data.expense]);
      setNewExpense({ name: '', amount: '', category_id: '', time: '' });
    } catch (error) {
      console.error('Error adding expense:', error.response?.data || error.message);
      setError('Failed to add expense. Please check the data and try again.');
    }
  };

  const handleEditExpense = async (id) => {
    try {
      const response = await axios.put(`https://msib-6-test-7uaujedvyq-et.a.run.app/api/expense/${id}`, editingExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const updatedExpenses = expenses.map((expense) => (expense.id === id ? response.data.expense : expense));
      setExpenses(updatedExpenses);
      setEditingExpense(null);
    } catch (error) {
      console.error('Error editing expense:', error.response?.data || error.message);
      setError('Failed to edit expense. Please check the data and try again.');
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`https://msib-6-test-7uaujedvyq-et.a.run.app/api/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error('Error deleting expense:', error.response?.data || error.message);
      setError('Failed to delete expense. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingExpense) {
      setEditingExpense({ ...editingExpense, [name]: value });
    } else {
      setNewExpense({ ...newExpense, [name]: value });
    }
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div>
      <h2>Expense List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              {editingExpense?.id === expense.id ? (
                <>
                  <td>
                    <input type="text" name="name" value={editingExpense.name} onChange={handleInputChange} />
                  </td>
                  <td>
                    <input type="text" name="amount" value={editingExpense.amount} onChange={handleInputChange} />
                  </td>
                  <td>
                    <input type="text" name="category_id" value={editingExpense.category_id} onChange={handleInputChange} />
                  </td>
                  <td>
                    <input type="datetime-local" name="time" value={editingExpense.time} onChange={handleInputChange} />
                  </td>
                  <td>
                    <button onClick={() => handleEditExpense(expense.id)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{expense.name}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.category_id}</td>
                  <td>{new Date(expense.time).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleEditClick(expense)}>Edit</button>
                    <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Expense</h3>
      <div>
        <input type="text" name="name" value={newExpense.name} placeholder="Expense Name" onChange={handleInputChange} />
        <input type="text" name="amount" value={newExpense.amount} placeholder="Amount" onChange={handleInputChange} />
        <input type="text" name="category_id" value={newExpense.category_id} placeholder="Category ID" onChange={handleInputChange} />
        <input type="datetime-local" name="time" value={newExpense.time} onChange={handleInputChange} />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
    </div>
  );
};

export default ExpenseList;
