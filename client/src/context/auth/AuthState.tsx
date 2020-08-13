import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import { initialState } from './authContext';
import authReducer from './authReducer';
import { authTypes } from '../types';

const AuthState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (user: { email: string; password: string }) => {
    dispatch({ type: authTypes.START_LOGIN });

    try {
      // eslint-disable-next-line
      const res = await axios.post('/auth/login', user);
      dispatch({
        type: authTypes.LOAD_USER,
        payload: { user: res.data.user, token: res.data.token },
      });
    } catch (err) {
      dispatch({
        type: authTypes.LOGIN_ERROR,
        payload: err.message,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedin: state.loggedin,
        loading: state.loading,
        user: state.user,
        token: state.token,
        loginLoadiing: state.loginLoadiing,
        loginError: state.loginError,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
