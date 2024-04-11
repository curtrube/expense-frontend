import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../hooks/authProvider';

function Login() {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.username !== '' && input.password !== '') {
      auth.login(input);
      return;
    }
    alert('Enter username and/or password');
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="vh-100 container d-flex justify-content-center align-items-center">
      <div className="border p-5 rounded bg-body-tertiary">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginFormUsername">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              required
              aria-describedby="username"
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
              aria-describedby="password"
              onChange={handleInput}
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
