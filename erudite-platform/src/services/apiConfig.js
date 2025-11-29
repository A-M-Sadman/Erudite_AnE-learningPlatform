const API_BASE_URL = 'http://localhost:5000/api';

// Enhanced API call function with better error handling
const apiCall = async (endpoint, options = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add credentials for CORS
  config.credentials = 'include';

  try {
    console.log(`API Call: ${endpoint}`, config);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error ${response.status}:`, errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText || 'Unknown error occurred' };
      }
      
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('API call failed:', error);
    
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to server. Please make sure the backend is running on port 5000.');
    }
    
    throw error;
  }
};

// Test server connection
export const testServerConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (response.ok) {
      const data = await response.json();
      console.log('Server connection OK:', data);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Server connection test failed:', error);
    return false;
  }
};

export default apiCall;