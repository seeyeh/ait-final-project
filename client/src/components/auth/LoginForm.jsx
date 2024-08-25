import axios from '@/api/axios';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import useAuth from '@/hooks/useAuth';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const LOGIN_URL = '/auth';

function LoginForm() {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dash';

  const { formState, handleSubmit, register, setError, setFocus, resetField } =
    useForm({ defaultValues: { username: '', password: '', persist } });

  // Set focus on username input when component loads;
  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  const errorMessage =
    formState.errors.root?.serverError?.message ??
    formState.errors.username?.message ??
    formState.errors.password?.message;

  const onSubmit = async (formData) => {
    const { username, password, persist } = formData;

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      localStorage.setItem('persist', persist);
      setPersist(persist);

      const accessToken = response?.data?.accessToken;
      setAuth({ username, password, accessToken });
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setError('root.serverError', {
          type: '500',
          message: 'No server response.'
        });
      } else if (err.response.status === 401) {
        setError('username', {
          type: '401',
          message: 'Invalid username or password.'
        });
      } else {
        setError('root.serverError', {
          type: '400',
          message: 'Login failed. Please try again later.'
        });
      }
      resetField('password');
    }
  };

  return (
    <div className="my-auto flex h-fit w-[24rem] max-w-full flex-col gap-6 rounded-5xl border border-grayscale-25 p-8 shadow-2xl backdrop-blur-[1px] backdrop-brightness-95">
      <h1 className="text-h2 text-black">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="flex w-full flex-1 flex-col gap-4">
          <Input
            id="username"
            label="Username"
            className="w-full min-w-32"
            {...register('username', {
              required: {
                value: true,
                message: 'Username is a required field.'
              }
            })}
          />
          <Input
            id="password"
            label="Password"
            className="w-full min-w-32"
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is a required field.'
              }
            })}
          />
          <div className="flex min-h-12 flex-row items-center justify-between gap-4 max-sm:flex-wrap">
            <p
              className={'text-p text-pink-medium'}
              aria-live="assertive"
            >
              {errorMessage}
            </p>
            <a
              href="/login"
              className="w-full text-nowrap text-right text-p text-grayscale-60 hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Checkbox
            id="persist"
            label="Stay signed in?"
            {...register('persist')}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              variant="pink"
              hover="gray"
              size="lg"
              type="submit"
            >
              Log In
            </Button>
            <Link to="/sign-up">
              <Button
                hover="gray"
                size="lg"
                type="button"
              >
                Create an account
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
