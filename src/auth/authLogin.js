import axios from 'axios';
import { loginSuccess } from '../actions/authActions';

export const login = async (email, password, dispatch) => {
  try {
    const response = await axios.post('https://internship-backend-2-ou29.onrender.com/login', {
      email,
      password,
    });

    if (response.status === 200) {
      const token = response.data.token;
      dispatch(loginSuccess(token));
      return token;
    } else {
      console.log(response);
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
