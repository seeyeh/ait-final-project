import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import Button from '../Button';
import Input from '../Input';

import axios from '../../api/axios.js';
const LOGIN_URL = '/auth';

function LoginForm() {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dash';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  // Set focus on username input when component loads;
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Removes error message whenever username/password gets changed because user has read it
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      setAuth({ user, pwd, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response.');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing username or password.');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized.');
      } else {
        setErrMsg('Login failed.');
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]); // whenever persist changes, set an item called "persist" in local storage to the new value

  return (
    <div className="flex h-fit w-[24rem] flex-col gap-6 rounded-5xl bg-grayscale-5 p-8 shadow-black/50 drop-shadow-2xl">
      <h1 className="text-h2 text-black">Login</h1>
      <div className="flex flex-col gap-8">
        <div className="flex w-full flex-1 flex-col gap-4">
          <Input
            id="username"
            header="Username"
            className="w-full text-h4"
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <Input
            id="password"
            header="Password"
            className="w-full"
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <div className="flex flex-row items-center justify-between">
            <p
              ref={errRef}
              className={'text-p text-pink-medium'}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <a href="/login" className="text-p text-grayscale-60">
              Forgot password?
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-row content-center gap-2 text-h6 text-grayscale-80">
            <input
              type="checkbox"
              id="persist"
              className="h-5 w-5 appearance-none rounded-md border-2 bg-white transition-colors checked:bg-green-light"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist">Stay signed in?</label>
          </div>

          <div className="flex gap-2">
            <Button
              variant="pink"
              hover="gray"
              size="lg"
              onClick={handleSubmit}
            >
              Next
            </Button>
            <Button hover="gray" size="lg">
              Create an account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
