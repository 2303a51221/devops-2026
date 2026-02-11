import { render, screen } from "@testing-library/react";
import Expenses from "./Expenses";

test("renders Expenses heading", () => {
  render(<Expenses transactions={[]} onAddTransaction={() => {}} onDeleteTransaction={() => {}} />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Expenses/i);
});

test("displays total expenses", () => {
  const transactions = [
    { id: 1, type: 'expense', amount: 100, description: 'Groceries', category: 'food', date: '2/11/2026' }
  ];
  render(<Expenses transactions={transactions} onAddTransaction={() => {}} onDeleteTransaction={() => {}} />);
  expect(screen.getByText(/Total Expenses:/i)).toBeInTheDocument();
});
