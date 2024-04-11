import { useRef, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <div>
      <h1>Register</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            id="username"
            required
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            aria-describedby="username"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default Register;
