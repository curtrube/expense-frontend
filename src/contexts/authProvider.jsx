import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContent = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRefreshValidity = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          console.log('token refreshed');
          setUser(data.user);
          setToken(data.token);
          setIsAuthenticated(true);
          return;
        } else {
          setUser(null);
          navigate('/');
        }
      } catch (err) {
        console.error(`error checking refresh token validity: ${err} `);
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
      }
    };
    checkRefreshValidity();
  }, []);

  const login = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      if (response.ok) {
        const res = await response.json();
        if (res) {
          // console.log(res);
          setUser(res.username);
          setToken(res.accessToken);
          setIsAuthenticated(true);
          navigate('/dashboard');
          return;
        }
        throw new Error(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    // setUser(null);
    // setToken('');
    // Cookies.remove('accessToken');
    navigate('/login');
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
