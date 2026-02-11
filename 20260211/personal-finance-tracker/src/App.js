import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Income from './Income';
import Expenses from './Expenses';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard transactions={transactions} />;
      case 'income':
        return (
          <Income 
            transactions={transactions} 
            onAddTransaction={addTransaction}
            onDeleteTransaction={deleteTransaction}
          />
        );
      case 'expenses':
        return (
          <Expenses 
            transactions={transactions} 
            onAddTransaction={addTransaction}
            onDeleteTransaction={deleteTransaction}
          />
        );
      default:
        return <Dashboard transactions={transactions} />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>💰 Personal Finance Tracker</h1>
        <nav className="nav-tabs">
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-btn ${activeTab === 'income' ? 'active' : ''}`}
            onClick={() => setActiveTab('income')}
          >
            Income
          </button>
          <button 
            className={`nav-btn ${activeTab === 'expenses' ? 'active' : ''}`}
            onClick={() => setActiveTab('expenses')}
          >
            Expenses
          </button>
        </nav>
      </header>
      <main className="App-main">
        {renderContent()}
      </main>
      <footer className="App-footer">
        <p>Personal Finance Tracker © 2026</p>
      </footer>
    </div>
  );
}

export default App;
