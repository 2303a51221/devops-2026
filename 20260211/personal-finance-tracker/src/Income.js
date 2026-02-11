import React, { useState } from 'react';

function Income({ transactions, onAddTransaction, onDeleteTransaction }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() && amount > 0) {
      onAddTransaction({
        id: Date.now(),
        type: 'income',
        description: description.trim(),
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString()
      });
      setDescription('');
      setAmount('');
    }
  };

  return (
    <div className="income">
      <h1>Income</h1>
      <div className="total-display">
        <h3>Total Income: <span className="positive">${totalIncome.toFixed(2)}</span></h3>
      </div>
      
      <form onSubmit={handleSubmit} className="transaction-form">
        <h2>Add New Income</h2>
        <div className="form-group">
          <label htmlFor="income-description">Description</label>
          <input
            id="income-description"
            type="text"
            placeholder="e.g., Salary, Freelance work"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="income-amount">Amount ($)</label>
          <input
            id="income-amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-income">Add Income</button>
      </form>

      <div className="transaction-history">
        <h2>Income History</h2>
        {incomeTransactions.length === 0 ? (
          <p className="no-data">No income recorded yet.</p>
        ) : (
          <ul className="transaction-list">
            {incomeTransactions.map(t => (
              <li key={t.id} className="income">
                <div className="transaction-info">
                  <span className="description">{t.description}</span>
                  <span className="date">{t.date}</span>
                </div>
                <div className="transaction-actions">
                  <span className="amount positive">+${t.amount.toFixed(2)}</span>
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

export default Income;
