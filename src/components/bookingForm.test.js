import { render, screen } from '@testing-library/react';
import BookingForm from './bookingForm';

// Mock dispatch function
const mockDispatch = jest.fn();

// Mock availableTimes
const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

test('Renders the BookingForm "Choose date" label', () => {
  render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
  const labelElement = screen.getByText('Choose date');
  expect(labelElement).toBeInTheDocument();
});

test('Renders the BookingForm "Choose time" label', () => {
  render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
  const labelElement = screen.getByText('Choose time');
  expect(labelElement).toBeInTheDocument();
});

test('Renders the BookingForm "Number of guests" label', () => {
  render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
  const labelElement = screen.getByText('Number of guests');
  expect(labelElement).toBeInTheDocument();
});

test('Renders the BookingForm "Occasion" label', () => {
  render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
  const labelElement = screen.getByText('Occasion');
  expect(labelElement).toBeInTheDocument();
});

test('Renders the BookingForm submit button', () => {
  render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} />);
  const submitButton = screen.getByText('Make Your reservation');
  expect(submitButton).toBeInTheDocument();
});

