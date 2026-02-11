import React from 'react';

function Dashboard({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = income - expenses;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="summary-cards">
        <div className="card balance">
          <h3>Current Balance</h3>
          <p className={balance >= 0 ? 'positive' : 'negative'}>
            ${balance.toFixed(2)}
          </p>
        </div>
        <div className="card income-card">
          <h3>Total Income</h3>
          <p className="positive">${income.toFixed(2)}</p>
        </div>
        <div className="card expense-card">
          <h3>Total Expenses</h3>
          <p className="negative">${expenses.toFixed(2)}</p>
        </div>
      </div>
      <div className="recent-transactions">
        <h2>Recent Transactions</h2>
        {transactions.length === 0 ? (
          <p className="no-data">No transactions yet. Add income or expenses to get started!</p>
        ) : (
          <ul className="transaction-list">
            {transactions.slice(-5).reverse().map(t => (
              <li key={t.id} className={t.type}>
                <span className="description">{t.description}</span>
                <span className={`amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
