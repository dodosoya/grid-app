import { render, screen } from '@testing-library/react';
import App from './App';

test('render App', () => {
  render(<App />);
  const h1 = screen.getByText(/Grid App/i);
  expect(h1).toBeInTheDocument();
});
