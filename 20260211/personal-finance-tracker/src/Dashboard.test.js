import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

test("renders Dashboard heading", () => {
  render(<Dashboard transactions={[]} />);
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});

test("displays correct balance with transactions", () => {
  const transactions = [
    { id: 1, type: 'income', amount: 1000, description: 'Salary' },
    { id: 2, type: 'expense', amount: 200, description: 'Groceries' }
  ];
  render(<Dashboard transactions={transactions} />);
  expect(screen.getByText(/\$800\.00/)).toBeInTheDocument();
});
