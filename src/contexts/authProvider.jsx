import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants/url';

const URL = `${API_URL}/auth`;

const AuthContent = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRefreshValidity = async () => {
      try {
        const response = await fetch(`${URL}/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error refreshing token: ${response.status}`);
        }
        const data = await response.json();
        setUser(data.username);
        setToken(data.accessToken);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } catch (err) {
        console.error('error checking refresh token validity:', err);
      }
    };
    checkRefreshValidity();
  }, []);

  const login = async (data) => {
    try {
      const response = await fetch(`${URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error logging in: ${response.status}`);
      }
      const res = await response.json();
      setUser(res.username);
      setToken(res.accessToken);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      console.error('error logging into server:', err);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error logging out: ${response.status}`);
      }
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      navigate('/');
    } catch (err) {
      console.error('error logging out of server', err);
    }
  };

  return (
    <AuthContent.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContent.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContent);
};
