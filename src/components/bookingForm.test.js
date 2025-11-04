import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from './bookingForm';

// Mock dispatch function
const mockDispatch = jest.fn();
const mockSubmitForm = jest.fn();

// Mock availableTimes
const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

// Helper function to render form with default props
const renderForm = (props = {}) => {
  return render(
    <BookingForm 
      availableTimes={mockAvailableTimes} 
      dispatch={mockDispatch}
      submitForm={mockSubmitForm}
      {...props}
    />
  );
};

describe('Static Text Rendering', () => {
  test('Renders the BookingForm "Choose date" label', () => {
    renderForm();
    const labelElement = screen.getByText('Choose date');
    expect(labelElement).toBeInTheDocument();
  });

  test('Renders the BookingForm "Choose time" label', () => {
    renderForm();
    const labelElement = screen.getByText('Choose time');
    expect(labelElement).toBeInTheDocument();
  });

  test('Renders the BookingForm "Number of guests" label', () => {
    renderForm();
    const labelElement = screen.getByText('Number of guests');
    expect(labelElement).toBeInTheDocument();
  });

  test('Renders the BookingForm "Occasion" label', () => {
    renderForm();
    const labelElement = screen.getByText('Occasion');
    expect(labelElement).toBeInTheDocument();
  });

  test('Renders the BookingForm submit button', () => {
    renderForm();
    const submitButton = screen.getByText('Make Your reservation');
    expect(submitButton).toBeInTheDocument();
  });
});

describe('HTML5 Validation Attributes', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockSubmitForm.mockClear();
  });

  test('Date input has required attribute', () => {
    renderForm();
    const dateInput = screen.getByLabelText('Choose date');
    expect(dateInput).toHaveAttribute('required');
  });

  test('Date input has min attribute set to today', () => {
    renderForm();
    const dateInput = screen.getByLabelText('Choose date');
    const today = new Date().toISOString().split('T')[0];
    expect(dateInput).toHaveAttribute('min', today);
  });

  test('Date input has type="date"', () => {
    renderForm();
    const dateInput = screen.getByLabelText('Choose date');
    expect(dateInput).toHaveAttribute('type', 'date');
  });

  test('Time select has required attribute', () => {
    renderForm();
    const timeSelect = screen.getByLabelText('Choose time');
    expect(timeSelect).toHaveAttribute('required');
  });

  test('Guests input has required attribute', () => {
    renderForm();
    const guestsInput = screen.getByLabelText('Number of guests');
    expect(guestsInput).toHaveAttribute('required');
  });

  test('Guests input has min="1" attribute', () => {
    renderForm();
    const guestsInput = screen.getByLabelText('Number of guests');
    expect(guestsInput).toHaveAttribute('min', '1');
  });

  test('Guests input has max="10" attribute', () => {
    renderForm();
    const guestsInput = screen.getByLabelText('Number of guests');
    expect(guestsInput).toHaveAttribute('max', '10');
  });

  test('Guests input has type="number"', () => {
    renderForm();
    const guestsInput = screen.getByLabelText('Number of guests');
    expect(guestsInput).toHaveAttribute('type', 'number');
  });

  test('Occasion select does not have required attribute (optional field)', () => {
    renderForm();
    const occasionSelect = screen.getByLabelText('Occasion');
    expect(occasionSelect).not.toHaveAttribute('required');
  });

  test('Form has noValidate attribute', () => {
    const { container } = renderForm();
    const form = container.querySelector('form');
    expect(form).toHaveAttribute('noValidate');
  });
});

describe('JavaScript Validation - Date Field', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockSubmitForm.mockClear();
  });

  test('Shows error when date is empty (invalid state)', async () => {
    renderForm();
    const dateInput = screen.getByLabelText('Choose date');
    
    // Focus and blur without entering a value
    fireEvent.blur(dateInput);
    
    await waitFor(() => {
      expect(screen.getByText('Date is required')).toBeInTheDocument();
    });
  });

  test('Shows error when date is in the past (invalid state)', async () => {
    renderForm();
    const dateInput = screen.getByLabelText('Choose date');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];
    
    fireEvent.change(dateInput, { target: { value: yesterdayString } });
    fireEvent.blur(dateInput);
    
    await waitFor(() => {
      expect(screen.getByText('Date cannot be in the past')).toBeInTheDocument();
    });
  });

  test('No error when date is today (valid state)', async () => {
    renderForm();
    const dateInput = screen.getByLabelText('Choose date');
    const today = new Date().toISOString().split('T')[0];
    
    fireEvent.change(dateInput, { target: { value: today } });
    fireEvent.blur(dateInput);
    
    await waitFor(() => {
      expect(screen.queryByText('Date is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Date cannot be in the past')).not.toBeInTheDocument();
    });
  });

  test('No error when date is in the future (valid state)', async () => {
    renderForm();
    const dateInput = screen.getByLabelText('Choose date');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    
    fireEvent.change(dateInput, { target: { value: tomorrowString } });
    fireEvent.blur(dateInput);
    
    await waitFor(() => {
      expect(screen.queryByText('Date is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Date cannot be in the past')).not.toBeInTheDocument();
    });
  });
});

describe('JavaScript Validation - Time Field', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockSubmitForm.mockClear();
  });

  test('Shows error when time is not selected (invalid state)', async () => {
    renderForm();
    const timeSelect = screen.getByLabelText('Choose time');
    
    fireEvent.blur(timeSelect);
    
    await waitFor(() => {
      expect(screen.getByText('Time is required')).toBeInTheDocument();
    });
  });

  test('No error when time is selected (valid state)', async () => {
    renderForm();
    const timeSelect = screen.getByLabelText('Choose time');
    
    fireEvent.change(timeSelect, { target: { value: '17:00' } });
    fireEvent.blur(timeSelect);
    
    await waitFor(() => {
      expect(screen.queryByText('Time is required')).not.toBeInTheDocument();
    });
  });
});

describe('JavaScript Validation - Guests Field', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockSubmitForm.mockClear();
  });

  test('Shows error when guests is empty (invalid state)', async () => {
    renderForm();
    const guestsInput = screen.getByLabelText('Number of guests');
    
    fireEvent.blur(guestsInput);
    
    await waitFor(() => {
      expect(screen.getByText('Number of guests is required')).toBeInTheDocument();
    });
  });

  test('Shows error when guests is less than 1 (invalid state)', async () => {
    renderForm();
    const guestsInput = screen.getByLabelText('Number of guests');
    
    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.blur(guestsInput);
    
    await waitFor(() => {
      expect(screen.getByText('Must be at least 1 guest')).toBeInTheDocument();
    });
  });

  test('Shows error when guests is greater than 10 (invalid state)', async () => {
    renderForm();
    const guestsInput = screen.getByLabelText('Number of guests');
    
    fireEvent.change(guestsInput, { target: { value: '11' } });
    fireEvent.blur(guestsInput);
    
    await waitFor(() => {
      expect(screen.getByText('Maximum 10 guests allowed')).toBeInTheDocument();
    });
  });

  test('No error when guests is 1 (valid state)', async () => {
    renderForm();
    const guestsInput = screen.getByLabelText('Number of guests');
    
    fireEvent.change(guestsInput, { target: { value: '1' } });
    fireEvent.blur(guestsInput);
    
    await waitFor(() => {
      expect(screen.queryByText('Number of guests is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Must be at least 1 guest')).not.toBeInTheDocument();
      expect(screen.queryByText('Maximum 10 guests allowed')).not.toBeInTheDocument();
    });
  });

  test('No error when guests is 10 (valid state)', async () => {
    renderForm();
    const guestsInput = screen.getByLabelText('Number of guests');
    
    fireEvent.change(guestsInput, { target: { value: '10' } });
    fireEvent.blur(guestsInput);
    
    await waitFor(() => {
      expect(screen.queryByText('Number of guests is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Must be at least 1 guest')).not.toBeInTheDocument();
      expect(screen.queryByText('Maximum 10 guests allowed')).not.toBeInTheDocument();
    });
  });

  test('No error when guests is between 1 and 10 (valid state)', async () => {
    renderForm();
    const guestsInput = screen.getByLabelText('Number of guests');
    
    fireEvent.change(guestsInput, { target: { value: '5' } });
    fireEvent.blur(guestsInput);
    
    await waitFor(() => {
      expect(screen.queryByText('Number of guests is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Must be at least 1 guest')).not.toBeInTheDocument();
      expect(screen.queryByText('Maximum 10 guests allowed')).not.toBeInTheDocument();
    });
  });
});

describe('Submit Button State', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockSubmitForm.mockClear();
  });

  test('Submit button is disabled when form is invalid', () => {
    renderForm();
    const submitButton = screen.getByText('Make Your reservation');
    expect(submitButton).toBeDisabled();
  });

  test('Submit button is enabled when all fields are valid', async () => {
    renderForm();
    const dateInput = screen.getByLabelText('Choose date');
    const timeSelect = screen.getByLabelText('Choose time');
    const guestsInput = screen.getByLabelText('Number of guests');
    const submitButton = screen.getByText('Make Your reservation');

    // Fill in all required fields with valid values
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

    fireEvent.change(dateInput, { target: { value: tomorrowString } });
    fireEvent.change(timeSelect, { target: { value: '17:00' } });
    fireEvent.change(guestsInput, { target: { value: '2' } });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  test('Submit button remains disabled if any field is invalid', async () => {
    renderForm();
    const dateInput = screen.getByLabelText('Choose date');
    const timeSelect = screen.getByLabelText('Choose time');
    const guestsInput = screen.getByLabelText('Number of guests');
    const submitButton = screen.getByText('Make Your reservation');

    // Fill date and time but leave guests empty
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

    fireEvent.change(dateInput, { target: { value: tomorrowString } });
    fireEvent.change(timeSelect, { target: { value: '17:00' } });
    // Don't fill guests

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
});

describe('Form Submission', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockSubmitForm.mockClear();
  });

  test('Calls submitForm when form is valid and submitted', async () => {
    mockSubmitForm.mockReturnValue(true);
    renderForm();
    
    const dateInput = screen.getByLabelText('Choose date');
    const timeSelect = screen.getByLabelText('Choose time');
    const guestsInput = screen.getByLabelText('Number of guests');
    const submitButton = screen.getByText('Make Your reservation');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

    fireEvent.change(dateInput, { target: { value: tomorrowString } });
    fireEvent.change(timeSelect, { target: { value: '17:00' } });
    fireEvent.change(guestsInput, { target: { value: '2' } });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalledWith({
        date: tomorrowString,
        time: '17:00',
        guests: '2',
        occasion: '',
      });
    });
  });

  test('Does not call submitForm when form is invalid', async () => {
    mockSubmitForm.mockReturnValue(true);
    renderForm();
    
    const submitButton = screen.getByText('Make Your reservation');
    
    // Try to submit without filling fields
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmitForm).not.toHaveBeenCalled();
    });
  });
});

