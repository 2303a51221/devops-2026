import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { fetchDashboardData, ApiError } from './api/dashboardApi';
import { formatCurrency } from './utils/formatCurrency';
import './Dashboard.css';

// Auto-refresh interval in milliseconds (30 seconds)
const AUTO_REFRESH_INTERVAL = 30000;

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [lastRefresh, setLastRefresh] = useState(null);

    // Ref to track if component is mounted (for cleanup)
    const isMountedRef = useRef(true);

    // Fetch data with proper state management
    const loadDashboardData = useCallback(async (isManualRefresh = false) => {
        // Set appropriate loading state
        if (isManualRefresh) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }
        setError(null);

        try {
            const data = await fetchDashboardData();

            // Only update state if component is still mounted
            if (isMountedRef.current) {
                setDashboardData(data);
                setLastRefresh(new Date().toLocaleTimeString());
            }
        } catch (err) {
            if (isMountedRef.current) {
                setError({
                    message: err instanceof ApiError ? err.message : 'An unexpected error occurred',
                    type: err instanceof ApiError ? err.type : 'unknown'
                });
            }
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
                setRefreshing(false);
            }
        }
    }, []);

    // Initial fetch on mount + auto-refresh setup
    useEffect(() => {
        isMountedRef.current = true;

        // Initial data load
        loadDashboardData();

        // Set up auto-refresh
        const intervalId = setInterval(() => {
            loadDashboardData(true);
        }, AUTO_REFRESH_INTERVAL);

        // Cleanup on unmount
        return () => {
            isMountedRef.current = false;
            clearInterval(intervalId);
        };
    }, [loadDashboardData]);

    // Manual refresh handler
    const handleRefresh = () => {
        if (!refreshing) {
            loadDashboardData(true);
        }
    };

    // Memoized derived values for display
    const displayData = useMemo(() => ({
        totalIncome: formatCurrency(dashboardData?.totalIncome),
        totalExpenses: formatCurrency(dashboardData?.totalExpenses),
        balance: formatCurrency(dashboardData?.balance),
        isPositiveBalance: (dashboardData?.balance ?? 0) >= 0
    }), [dashboardData]);

    // Loading placeholder (skeleton UI)
    if (loading) {
        return (
            <div className="dashboard">
                <header className="dashboard-header">
                    <h1 className="dashboard-title">Personal Finance Dashboard</h1>
                    <p className="dashboard-subtitle">Loading your financial summary...</p>
                </header>
                <main className="dashboard-content">
                    <div className="summary-cards">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="card skeleton">
                                <div className="skeleton-label"></div>
                                <div className="skeleton-value"></div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="dashboard">
                <header className="dashboard-header">
                    <h1 className="dashboard-title">Personal Finance Dashboard</h1>
                </header>
                <main className="dashboard-content">
                    <div className="error-state">
                        <div className="error-icon">
                            {error.type === 'network' ? '🔌' : '⚠️'}
                        </div>
                        <h2 className="error-title">
                            {error.type === 'network' ? 'Connection Error' : 'Server Error'}
                        </h2>
                        <p className="error-message">{error.message}</p>
                        <button className="btn btn-primary" onClick={handleRefresh}>
                            Try Again
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">Personal Finance Dashboard</h1>
                    <p className="dashboard-subtitle">Track your income and expenses</p>
                </div>
                <div className="header-actions">
                    <button
                        className={`btn btn-secondary ${refreshing ? 'loading' : ''}`}
                        onClick={handleRefresh}
                        disabled={refreshing}
                    >
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                    {lastRefresh && (
                        <span className="last-updated">Updated: {lastRefresh}</span>
                    )}
                </div>
            </header>

            <main className="dashboard-content">
                {/* Primary Summary Cards */}
                <section className="summary-cards">
                    <div className="card">
                        <span className="card-label">Total Income</span>
                        <span className="card-value positive">{displayData.totalIncome}</span>
                    </div>

                    <div className="card">
                        <span className="card-label">Total Expenses</span>
                        <span className="card-value negative">{displayData.totalExpenses}</span>
                    </div>

                    <div className="card card-highlight">
                        <span className="card-label">Balance</span>
                        <span className={`card-value ${displayData.isPositiveBalance ? 'positive' : 'negative'}`}>
                            {displayData.balance}
                        </span>
                    </div>
                </section>

                {/* Optional: Category Breakdown (easily removable) */}
                {dashboardData?.incomeByCategory && dashboardData?.expensesByCategory && (
                    <section className="breakdown-section">
                        <div className="breakdown-card">
                            <h3 className="breakdown-title">Income Breakdown</h3>
                            <ul className="breakdown-list">
                                {Object.entries(dashboardData.incomeByCategory).map(([category, amount]) => (
                                    <li key={category} className="breakdown-item">
                                        <span>{category}</span>
                                        <span className="positive">{formatCurrency(amount)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="breakdown-card">
                            <h3 className="breakdown-title">Expense Breakdown</h3>
                            <ul className="breakdown-list">
                                {Object.entries(dashboardData.expensesByCategory).map(([category, amount]) => (
                                    <li key={category} className="breakdown-item">
                                        <span>{category}</span>
                                        <span className="negative">{formatCurrency(amount)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </main>

            <footer className="dashboard-footer">
                <span>Auto-refreshes every 30 seconds</span>
                {dashboardData?.transactionCount && (
                    <span>{dashboardData.transactionCount} transactions</span>
                )}
            </footer>
        </div>
    );
}

export default Dashboard;
