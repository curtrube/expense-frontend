import { useRef, useState, useEffect } from 'react';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  return (
    <section>
      <div className="mb-4">
        <h1>Register</h1>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Username
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              placeholder="username"
              required
              autoComplete="off"
              ref={userRef}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password
            <input
              className="form-control"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="confirm password"
            />
          </label>
        </div>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
