import React, { useState } from 'react';
import config from '../../config/config';
import AuthContext from './authContext';

const AuthState = (props) => {
  const baseURL = config.API_BASE_URL || '';
  const initialToken = localStorage.getItem('token') || '';
  const initialResetToken = '';

  const [token, setToken] = useState(initialToken);
  const [resetToken, setResetToken] = useState(initialResetToken);
  const [error, setError] = useState(null); // State for managing errors

  const handleResponse = async (response) => {
    if (!response.ok) {
      const errorMessage = await getErrorMessage(response);
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data?.data?.records?.token;
  };

  const getErrorMessage = async (response) => {
    let errorMessage = `Error: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.error) {
        // errorMessage = `${errorMessage} - ${errorData.error.message}`;
        errorMessage = errorData.error.message;
      } else if (errorData && errorData.message) {
        errorMessage = `${errorMessage} - ${errorData.message}`;
      }
    } catch (e) {
      // If the response body is not JSON or there's another error
      console.error('Failed to parse error response:', e);
    }
    return errorMessage;
  };

  // login
  const login = async (email, password) => {
    const url = `${baseURL}/api/auth/login`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const token = await handleResponse(response);
      if (token) {
        setToken(token);
        localStorage.setItem('token', token); // Save token to localStorage
        return true; // Indicate success
      } else {
        throw new Error('Failed to retrieve token from response');
      }
    } catch (error) {
      setError(error.message);
      return false; // Indicate failure
    }
  };

  // signup or register
  const register = async (name, email, password) => {
    const url = `${baseURL}/api/auth/createuser`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const token = await handleResponse(response);
      if (token) {
        setToken(token);
        localStorage.setItem('token', token); // Save token to localStorage
        return true; // Indicate success
      } else {
        throw new Error('Failed to retrieve token from response');
      }
    } catch (error) {
      setError(error.message);
      // console.error('Registration Error:', error.message);
      return false; // Indicate failure
    }
  };

  // logout
  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  // Send reset token
  const sendResetToken = async (email) => {
    const url = `${baseURL}/api/auth/forgotpassword`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data && data.data && data.data.records) {
        setResetToken(data.data.records.resetToken);
        return true;
      } else {
        throw new Error('Failed to retrieve reset token');
      }
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  // Reset password
  const resetPassword = async (resetToken, newPassword) => {
    const url = `${baseURL}/api/auth/resetpassword`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': resetToken,
        },
        body: JSON.stringify({ resetToken, newPassword }),
      });

      const data = await response.json();
      if (data && data?.data?.records?.message) {
        return data; // Return any relevant data or success message
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      setError(error.message);
      throw error; // Rethrow to handle in the component
    }
  };

  return (
    <AuthContext.Provider value={{
      token, setToken, resetToken, setResetToken, login, register, logout, sendResetToken,
      resetPassword, error, setError
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
