import axios from 'axios';
import usersData from '../__mockdata__/usersData.json';
import { API_BASE_URL, LOGIN_IMAGE_API, LOGIN_USER, API_AVAILABLE } from './Constants';
import LoginImage from '../../src/assets/LoginImage.jpg';

export const fetchLoginImage = async () => {
  try {
    if (API_AVAILABLE) {
      const response = await axios.get(LOGIN_IMAGE_API);
      return response.data.imageUrl;
    } else {
      return LoginImage;
    }
  } catch (error) {
    console.error("Failed to fetch login image:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  let isAuthenticated = false;

  if (API_AVAILABLE) {
    try {
      const response = await axios.post(`${API_BASE_URL}${LOGIN_USER}`, {
        email,
        password,
      });
      isAuthenticated = response.data.isAuthenticated;
    } catch (error) {
      console.error("Failed to log in:", error);
      throw error;
    }
  } else {
    const user = usersData.users.find((user) => user.email === email);
    if (user && user.password === password) {
      isAuthenticated = true;
    }
  }

  return isAuthenticated;
};

export const checkEmailAvailability = async (email) => {
  let isAvailable = false;

  if (API_AVAILABLE) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?email=${email}`);
      const users = response.data;
      isAvailable = users.some((user) => user.email === email);
    } catch (error) {
      console.error("Failed to check email availability:", error);
      throw error;
    }
  } else {
    isAvailable = usersData.users.some((user) => user.email === email);
  }

  return isAvailable;
};

export const sendResetPasswordEmail = async (email) => {
  if (API_AVAILABLE) {
    try {
      await axios.post(`${API_BASE_URL}/reset-password`, {
        email,
      });
    } catch (error) {
      console.error("Failed to send reset password email:", error);
      throw error;
    }
  } else {
    console.error("Reset password Email is not Available.");
    alert("Reset password Email is not Available.");
  }
};
