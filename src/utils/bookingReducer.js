// Initialize available times using fetchAPI for today's date
export function initializeTimes() {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
  // Use fetchAPI if available, otherwise fallback to default times
  if (typeof window !== 'undefined' && window.fetchAPI) {
    return window.fetchAPI(todayString);
  }
  
  // Fallback to default times if API is not available
  return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
}

// Update available times based on selected date
export function updateTimes(state, action) {
  const selectedDate = action.date;
  
  // Use fetchAPI if available and date is provided
  if (typeof window !== 'undefined' && window.fetchAPI && selectedDate) {
    return window.fetchAPI(selectedDate);
  }
  
  // Fallback to initializeTimes if API is not available or no date provided
  return initializeTimes();
}

