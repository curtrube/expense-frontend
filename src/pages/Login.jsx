import { useState } from 'react';
import Cookies from 'js-cookie';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Function to set the authentication token as a cookie
const setCookie = (name, token) => {
  let expiry = null;
  if (name === 'accessToken') {
    // expire access token after 15min
    expiry = new Date(new Date().getTime() + 15 * 60 * 1000);
  } else {
    // 4hrs
    expiry = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);
  }
  Cookies.set(name, `Bearer ${token}`, {
    expires: expiry,
    domain: 'localhost',
  });
};

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      if (response.status === 200) {
        const data = await response.json();
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);
        onLogin();
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="vh-100 container d-flex justify-content-center align-items-center">
      <div className="border p-5 rounded bg-body-tertiary">
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="loginFormUsername">
            <Form.Control
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
