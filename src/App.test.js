import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Little Lemon header', () => {
  render(<App />);
  const logoElement = screen.getByAltText(/Little Lemon logo/i);
  expect(logoElement).toBeInTheDocument();
});
