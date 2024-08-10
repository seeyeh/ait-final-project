import Button from '../Button';
import Input from '../Input';
import { useRef, useState, useEffect } from 'react';

function LoginForm() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false); // just for dev purposes
    
  // Set focus on username input when component loads; 
  useEffect(() => {
    userRef.current.focus();
  }, [])

  // Removes error message whenever username/password gets changed because user has read it
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = (e) => {
    console.log(user, pwd);
    setUser('');
    setPwd('');
    setSuccess(true);
  }

  return (
    <div className="bg-grayscale-5 w-[32rem] h-[36rem] rounded-5xl shadow-glow-2xl shadow-black/50 p-8 flex flex-col gap-12">
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
