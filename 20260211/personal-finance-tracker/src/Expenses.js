import React, { useState } from 'react';

function Expenses({ transactions, onAddTransaction, onDeleteTransaction }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('general');

  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'transport', label: 'Transportation' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Health' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() && amount > 0) {
      onAddTransaction({
        id: Date.now(),
        type: 'expense',
        description: description.trim(),
        amount: parseFloat(amount),
        category,
        date: new Date().toLocaleDateString()
      });
      setDescription('');
      setAmount('');
      setCategory('general');
    }
  };

  return (
    <div className="expenses">
      <h1>Expenses</h1>
      <div className="total-display">
        <h3>Total Expenses: <span className="negative">${totalExpenses.toFixed(2)}</span></h3>
      </div>
      
      <form onSubmit={handleSubmit} className="transaction-form">
        <h2>Add New Expense</h2>
        <div className="form-group">
          <label htmlFor="expense-description">Description</label>
          <input
            id="expense-description"
            type="text"
            placeholder="e.g., Groceries, Rent"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expense-category">Category</label>
          <select
            id="expense-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="expense-amount">Amount ($)</label>
          <input
            id="expense-amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-expense">Add Expense</button>
      </form>

      <div className="transaction-history">
        <h2>Expense History</h2>
        {expenseTransactions.length === 0 ? (
          <p className="no-data">No expenses recorded yet.</p>
        ) : (
          <ul className="transaction-list">
            {expenseTransactions.map(t => (
              <li key={t.id} className="expense">
                <div className="transaction-info">
                  <span className="description">{t.description}</span>
                  <span className="category-tag">{t.category}</span>
                  <span className="date">{t.date}</span>
                </div>
                <div className="transaction-actions">
                  <span className="amount negative">-${t.amount.toFixed(2)}</span>
                  <button 
                    className="btn-delete" 
                    onClick={() => onDeleteTransaction(t.id)}
                    aria-label="Delete transaction"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Expenses;
