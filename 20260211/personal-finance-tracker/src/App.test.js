import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Personal Finance Tracker heading', () => {
  render(<App />);
  const headings = screen.getAllByRole('heading', { level: 1 });
  expect(headings[0]).toHaveTextContent(/Personal Finance Tracker/i);
});

test('renders navigation buttons', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Income' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Expenses' })).toBeInTheDocument();
});
