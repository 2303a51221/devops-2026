const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
    constructor(message, status, type) {
        super(message);
        this.status = status;
        this.type = type; // 'network' | 'server' | 'client'
    }
}

/**
 * Fetches dashboard summary data from the backend
 * @returns {Promise<{totalIncome: number, totalExpenses: number, balance: number}>}
 * @throws {ApiError}
 */
export const fetchDashboardData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard`);

        if (!response.ok) {
            const errorType = response.status >= 500 ? 'server' : 'client';
            throw new ApiError(
                `Failed to load dashboard (${response.status})`,
                response.status,
                errorType
            );
        }

        const result = await response.json();

        if (!result.success) {
            throw new ApiError(
                result.message || 'Failed to fetch data',
                null,
                'server'
            );
        }

        return result.data;
    } catch (error) {
        // Handle network errors (fetch failed entirely)
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new ApiError(
                'Unable to connect to server. Please check your connection.',
                null,
                'network'
            );
        }

        // Re-throw ApiError as-is
        if (error instanceof ApiError) {
            throw error;
        }

        // Wrap unknown errors
        throw new ApiError(
            error.message || 'An unexpected error occurred',
            null,
            'network'
        );
    }
};
