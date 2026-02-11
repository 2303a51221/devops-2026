const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample financial data (simulating database)
const financialData = {
    transactions: [
        { id: 1, type: 'income', category: 'Salary', amount: 5000, date: '2026-02-01' },
        { id: 2, type: 'income', category: 'Freelance', amount: 1500, date: '2026-02-05' },
        { id: 3, type: 'income', category: 'Investments', amount: 300, date: '2026-02-08' },
        { id: 4, type: 'expense', category: 'Rent', amount: 1200, date: '2026-02-01' },
        { id: 5, type: 'expense', category: 'Groceries', amount: 450, date: '2026-02-03' },
        { id: 6, type: 'expense', category: 'Utilities', amount: 150, date: '2026-02-05' },
        { id: 7, type: 'expense', category: 'Entertainment', amount: 200, date: '2026-02-07' },
        { id: 8, type: 'expense', category: 'Transportation', amount: 100, date: '2026-02-08' },
    ]
};

// Calculate summary data
const calculateSummary = () => {
    const totalIncome = financialData.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = financialData.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    // Get category breakdown
    const incomeByCategory = {};
    const expensesByCategory = {};

    financialData.transactions.forEach(t => {
        if (t.type === 'income') {
            incomeByCategory[t.category] = (incomeByCategory[t.category] || 0) + t.amount;
        } else {
            expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
        }
    });

    return {
        totalIncome,
        totalExpenses,
        balance,
        incomeByCategory,
        expensesByCategory,
        transactionCount: financialData.transactions.length,
        lastUpdated: new Date().toISOString()
    };
};

// API Routes

// Dashboard endpoint - returns summary of income and expenses
app.get('/api/dashboard', (req, res) => {
    try {
        // Simulate slight delay like a real database query
        setTimeout(() => {
            const summary = calculateSummary();
            res.json({
                success: true,
                data: summary
            });
        }, 500);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard data',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard`);
});
