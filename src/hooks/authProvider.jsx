import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// const setCookie = (name, token) => {
//   let expiry = null;
//   if (name === 'accessToken') {
//     // expire access token after 15min
//     expiry = new Date(new Date().getTime() + 15 * 60 * 1000);
//   } else {
//     // 4hrs
//     expiry = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);
//   }
//   Cookies.set(name, `Bearer ${token}`, {
//     expires: expiry,
//     secure: true,
//     domain: 'localhost', // TODO: update this
//   });
// };

const AuthContent = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
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
      if (response.status === 200) {
        const res = await response.json();
        if (res) {
          console.log(res);
          setUser(res.username);
          setToken(res.accessToken);
          navigate('/dashboard');
          return;
        }
        throw new Error(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    // setToken('');
    // Cookies.remove('accessToken');
    navigate('/login');
  };

  return (
    <AuthContent.Provider value={{ user, token, loginAction, logOut }}>
      {children}
    </AuthContent.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContent);
};
