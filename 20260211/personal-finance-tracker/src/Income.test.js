import { render, screen } from "@testing-library/react";
import Income from "./Income";

test("renders Income heading", () => {
  render(<Income transactions={[]} onAddTransaction={() => {}} onDeleteTransaction={() => {}} />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Income/i);
});

test("displays total income", () => {
  const transactions = [
    { id: 1, type: 'income', amount: 500, description: 'Freelance', date: '2/11/2026' }
  ];
  render(<Income transactions={transactions} onAddTransaction={() => {}} onDeleteTransaction={() => {}} />);
  expect(screen.getByText(/Total Income:/i)).toBeInTheDocument();
});
