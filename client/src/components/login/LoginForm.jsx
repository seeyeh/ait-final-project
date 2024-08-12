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
    <div className="bg-grayscale-5 w-[32rem] h-[36rem] rounded-5xl drop-shadow-2xl shadow-black/50 p-8 flex flex-col gap-12">
      <h1 className="text-h1 text-black">Login</h1>
      <div className="w-full flex-1 flex flex-col gap-4">
        <Input
          id="username"
          header="Username"
          className="w-full"
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
        <a href="/login" className="text-lg text-grayscale-60 self-end">
          Forgot password?
        </a>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      </div>

      <div>
        <input
          type="checkbox"
          id="persist"
          onChange={togglePersist}
          checked={persist}
        />
        <label htmlFor="persist">Trust this device?</label>
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
  );
}

export default LoginForm;
