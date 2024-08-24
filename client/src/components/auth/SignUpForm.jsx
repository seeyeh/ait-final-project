import axios from '@/api/axios';
import Button from '@/components/Button';
import Input from '@/components/Input';
import useAuth from '@/hooks/useAuth';

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const LOGIN_URL = '/auth';

function SignUpForm() {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dash';

  const userRef = useRef();
  const errRef = useRef();

  const [formState, setFormState] = useState({
    username: '',
    password: '',
    confirm: ''
  });
  const [error, setError] = useState('');

  // Set focus on username input when component loads;
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Removes error message whenever username/password gets changed because user has read it
  useEffect(() => {
    setError('');
  }, [formState]);

  const handleSubmit = async () => {
    const { username, password, confirm } = formState;
    if (password !== confirm) return setError('Passwords do not match.');

    try {
      const newAccountResponse = await axios.post(
        '/users',
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(newAccountResponse);
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      setAuth({ username, password, accessToken });
      setFormState({ username: '', password: '', confirm: '' });
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setError('No Server Response.');
      } else if (err.response?.status === 400) {
        setError('Missing username or password.');
      } else if (err.response?.status === 401) {
        setError('Unauthorized.');
      } else {
        setError('Login failed.');
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
    <div>
      <div className="flex h-fit w-[24rem] flex-col gap-6 rounded-5xl border border-grayscale-25 p-8 shadow-2xl backdrop-blur-[1px] backdrop-brightness-95">
        <h1 className="text-h2 text-black">Sign Up</h1>
        <div className="flex flex-col gap-8">
          <div className="flex w-full flex-1 flex-col gap-4">
            <Input
              id="username"
              header="Username"
              className="w-full text-h4"
              ref={userRef}
              onChange={(e) =>
                setFormState((form) => ({ ...form, username: e.target.value }))
              }
              value={formState.username}
              required
            />
            <Input
              id="password"
              header="Password"
              className="w-full"
              type="password"
              onChange={(e) =>
                setFormState((form) => ({ ...form, password: e.target.value }))
              }
              value={formState.password}
              required
            />
            <Input
              id="confirmPassword"
              header="Confirm password"
              className="w-full"
              type="password"
              onChange={(e) =>
                setFormState((form) => ({ ...form, confirm: e.target.value }))
              }
              value={formState.confirm}
              required
            />
            <div className="flex flex-row items-center justify-between">
              <p
                ref={errRef}
                className={'text-p text-pink-medium'}
                aria-live="assertive"
              >
                {error}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-row content-center gap-2 text-h6 text-grayscale-80">
              <input
                type="checkbox"
                id="persist"
                className="h-5 w-5 appearance-none rounded-lg border-2 bg-white transition-colors checked:border-green-dark checked:bg-green-light checked:shadow-[0px_0px_25px] checked:shadow-green-light"
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
                Create Account
              </Button>
              <Link to="/login">
                <Button
                  hover="gray"
                  size="lg"
                >
                  To login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
