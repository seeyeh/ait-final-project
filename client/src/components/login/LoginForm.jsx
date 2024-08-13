import Button from '../Button';
import Input from '../Input';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth.js';
import { useNavigate, useLocation } from 'react-router-dom';

import axios from '../../api/axios.js';
const LOGIN_URL = '/auth';

function LoginForm() {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dash";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
    
  // Set focus on username input when component loads; 
  useEffect(() => {
    userRef.current.focus();
  }, [])

  // Removes error message whenever username/password gets changed because user has read it
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async () => {
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({username: user, password: pwd}),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      setAuth({ user, pwd, accessToken })
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response.');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing username or password.')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized.');
      } else {
        setErrMsg('Login failed.');
      }
      errRef.current.focus()
    }
  }

  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
      localStorage.setItem("persist", persist);
  },[persist]) // whenever persist changes, set an item called "persist" in local storage to the new value

  return (
    <div className="bg-grayscale-5 w-[24rem] h-fit rounded-5xl drop-shadow-2xl shadow-black/50 p-8 flex flex-col gap-6">
      <h1 className="text-h2 text-black">Login</h1>
      <div className="flex flex-col gap-4">
        <div className="w-full flex-1 flex flex-col gap-4">
          <Input
            id="username"
            header="Username"
            className="w-full text-h4"
            ref={userRef}
            onChange={(e)=>setUser(e.target.value)}
            value={user}
            required
          />
          <Input
            id="password"
            header="Password"
            className="w-full"
            type="password"
            onChange={(e)=>setPwd(e.target.value)}
            value={pwd}
            required
          />
          <div className="flex flex-row justify-between content-center">
            <p ref={errRef} className={"text-pink-medium text-p"} aria-live="assertive">{errMsg}</p>
            <a href="/login" className="text-lg text-grayscale-60">
              Forgot password?
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-2 text-h6 text-grayscale-80 content-center">
            <input
              type="checkbox"
              id="persist"
              className="appearance-none w-5 h-5 border-2 rounded-md bg-white checked:bg-green-light transition-colors"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist">Stay signed in?</label>
          </div>

          <div className="flex gap-2">
            <Button variant="pink" hover="gray" size="lg" onClick={handleSubmit}>
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
