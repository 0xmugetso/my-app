import { initializeTimes, updateTimes } from './utils/bookingReducer';

// Mock fetchAPI function
const mockFetchAPI = jest.fn();

beforeEach(() => {
  // Set up window.fetchAPI mock before each test
  if (typeof window !== 'undefined') {
    window.fetchAPI = mockFetchAPI;
  } else {
    global.window = {
      fetchAPI: mockFetchAPI,
    };
  }
  mockFetchAPI.mockClear();
});

afterEach(() => {
  // Clean up after each test
  mockFetchAPI.mockClear();
});

describe('initializeTimes', () => {
  test('calls fetchAPI with today\'s date and returns the result', () => {
    const expectedTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    mockFetchAPI.mockReturnValue(expectedTimes);
    
    const result = initializeTimes();
    
    // Verify fetchAPI was called with today's date
    expect(mockFetchAPI).toHaveBeenCalledTimes(1);
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    expect(mockFetchAPI).toHaveBeenCalledWith(todayString);
    
    // Verify it returns the mocked result
    expect(result).toEqual(expectedTimes);
  });

  test('returns an array', () => {
    const mockTimes = ['17:00', '18:00', '19:00'];
    mockFetchAPI.mockReturnValue(mockTimes);
    
    const result = initializeTimes();
    expect(Array.isArray(result)).toBe(true);
  });

  test('returns array from fetchAPI', () => {
    const mockTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    mockFetchAPI.mockReturnValue(mockTimes);
    
    const result = initializeTimes();
    expect(result).toHaveLength(6);
    expect(result).toEqual(mockTimes);
  });

  test('falls back to default times if fetchAPI is not available', () => {
    // Store original fetchAPI
    const originalFetchAPI = window.fetchAPI;
    
    // Set fetchAPI to undefined to test fallback
    window.fetchAPI = undefined;
    
    const result = initializeTimes();
    const expectedTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    expect(result).toEqual(expectedTimes);
    
    // Restore fetchAPI for other tests
    window.fetchAPI = originalFetchAPI || mockFetchAPI;
  });
});

describe('updateTimes', () => {
  test('calls fetchAPI with the selected date from action and returns the result', () => {
    const selectedDate = '2024-01-15';
    const expectedTimes = ['17:00', '18:00', '19:00', '20:00'];
    mockFetchAPI.mockReturnValue(expectedTimes);
    
    const state = ['17:00', '18:00', '19:00'];
    const action = { type: 'UPDATE_TIMES', date: selectedDate };
    const result = updateTimes(state, action);
    
    // Verify fetchAPI was called with the selected date
    expect(mockFetchAPI).toHaveBeenCalledTimes(1);
    expect(mockFetchAPI).toHaveBeenCalledWith(selectedDate);
    
    // Verify it returns the mocked result
    expect(result).toEqual(expectedTimes);
  });

  test('returns different times for different dates', () => {
    const date1 = '2024-01-01';
    const times1 = ['17:00', '18:00', '19:00'];
    mockFetchAPI.mockReturnValueOnce(times1);
    
    const date2 = '2024-12-31';
    const times2 = ['20:00', '21:00', '22:00'];
    mockFetchAPI.mockReturnValueOnce(times2);
    
    const state = [];
    const action1 = { type: 'UPDATE_TIMES', date: date1 };
    const action2 = { type: 'UPDATE_TIMES', date: date2 };
    
    const result1 = updateTimes(state, action1);
    const result2 = updateTimes(state, action2);
    
    // Verify fetchAPI was called with correct dates
    expect(mockFetchAPI).toHaveBeenCalledWith(date1);
    expect(mockFetchAPI).toHaveBeenCalledWith(date2);
    
    // Verify different results for different dates
    expect(result1).toEqual(times1);
    expect(result2).toEqual(times2);
    expect(result1).not.toEqual(result2);
  });

  test('falls back to initializeTimes if date is not provided', () => {
    const defaultTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    mockFetchAPI.mockReturnValue(defaultTimes);
    
    const state = ['17:00', '18:00'];
    const action = { type: 'UPDATE_TIMES' }; // No date property
    
    const result = updateTimes(state, action);
    
    // Should call initializeTimes which calls fetchAPI with today's date
    expect(mockFetchAPI).toHaveBeenCalled();
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    expect(mockFetchAPI).toHaveBeenCalledWith(todayString);
    expect(result).toEqual(defaultTimes);
  });

  test('falls back to initializeTimes if fetchAPI is not available', () => {
    // Store original fetchAPI
    const originalFetchAPI = window.fetchAPI;
    
    // Set fetchAPI to undefined to test fallback
    window.fetchAPI = undefined;
    
    const state = ['17:00', '18:00'];
    const action = { type: 'UPDATE_TIMES', date: '2024-01-01' };
    const result = updateTimes(state, action);
    
    // Should fallback to default times (initializeTimes will also fallback)
    const expectedTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    expect(result).toEqual(expectedTimes);
    
    // Restore fetchAPI for other tests
    window.fetchAPI = originalFetchAPI || mockFetchAPI;
  });
});

