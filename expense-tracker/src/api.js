import axios from 'axios';

const API_URL = 'https://msib-6-test-7uaujedvyq-et.a.run.app/api';

// API auth login dan register
export const login = (email, password) => {
  return axios.post(
    `${API_URL}/login`,
    { email, password },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

export const register = (name, email, password, passwordConfirmation) => {
  return axios.post(
    `${API_URL}/register`,
    {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

// Fungsi untuk mendapatkan daftar kategori
export const getCategories = () => {
  return axios
    .get(`${API_URL}/category`, {
      headers: {
        Accept: 'application/json',
      },
    })
    .catch((error) => {
      console.error('Error fetching categories:', error);
      throw error;
    });
};

// Fungsi untuk mendapatkan daftar expenses
export const getExpenses = (token) => {
  return axios
    .get(`${API_URL}/expense`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      console.error('Error fetching expenses:', error);
      throw error;
    });
};

export const addExpense = (walletId, name, categoryId, amount, time) => {
  return axios.post(
    `${API_URL}/wallet/:wallet_id/expense`,
    {
      name,
      category_id: categoryId,
      amount,
      time,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

// Fungsi untuk mendapatkan daftar wallet
export const getWallets = (token) => {
  return axios
    .get(`${API_URL}/wallet?page=1&per_page=15`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      console.error('Error fetching wallets:', error);
      throw error;
    });
};

export const addWallet = (token, walletName) => {
  return axios
    .post(
      `${API_URL}/wallet`,
      { name: walletName },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .catch((error) => {
      console.error('Error adding wallet:', error);
      throw error;
    });
};

export const updateWallet = (token, walletId, walletName) => {
  return axios
    .put(
      `${API_URL}/wallet/:wallet_id`,
      { name: walletName },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .catch((error) => {
      console.error('Error updating wallet:', error);
      throw error;
    });
};

export const deleteWallet = (token, walletId) => {
  return axios
    .delete(`${API_URL}/wallet/:wallet_id`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      console.error('Error deleting wallet:', error);
      throw error;
    });
};
