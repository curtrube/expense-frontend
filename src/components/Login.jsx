import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/authProvider';

function Login() {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });
  const userRef = useRef();

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

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <section>
      <div className="mb-4">
        <h1>Login</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            className="form-control"
            type="text"
            id="username"
            name="username"
            placeholder="username"
            autoComplete="off"
            ref={userRef}
            onChange={handleInput}
            required
            aria-describedby="username"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            autoComplete="off"
            onChange={handleInput}
            required
            aria-describedby="password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="mt-2">
        <p>
          Not registered? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
