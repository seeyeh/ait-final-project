import axios from '@/api/axios';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const LOGIN_URL = '/auth';

const usernameValidation = {
  required: {
    value: true,
    message: 'Username is a required field.'
  },
  maxLength: {
    value: 24,
    message: 'Username must be between 3 and 24 characters long.'
  },
  minLength: {
    value: 3,
    message: 'Username must be between 3 and 24 characters long.'
  },
  pattern: {
    value: /^[a-zA-Z0-9_]+$/,
    message: 'Username contains invalid characters.'
  }
};
const passwordValidation = {
  required: {
    value: true,
    message: 'Password is a required field.'
  },
  maxLength: {
    value: 32,
    message: 'Password must be between 8 and 32 characters long.'
  },
  minLength: {
    value: 8,
    message: 'Password must be between 8 and 32 characters long.'
  },
  pattern: {
    value: /^(?=.*[0-9])(?=.*[a-zA-Z]).+$/,
    message: 'Password must contain a letter and a number.'
  }
};

function SignUpForm() {
  const { setAuth, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dash';
  const errorRef = useRef();

  const { formState, handleSubmit, register, watch, setError } = useForm({
    mode: 'onTouched'
  });

  const errorMessage =
    formState.errors.root?.serverError?.message ??
    formState.errors.username?.message ??
    formState.errors.password?.message ??
    formState.errors.confirm?.message;

  const onSubmit = async (formData) => {
    const { username, password, persist } = formData;

    try {
      await axios.post('/users', JSON.stringify({ username, password }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
    } catch (err) {
      if (!err?.response) {
        setError('root.serverError', {
          type: '500',
          message: 'No server response.'
        });
      } else if (err.response.status === 409) {
        setError('username', {
          type: '409',
          message: 'Username is already taken, please try another.'
        });
      } else {
        setError('root.serverError', {
          type: '400',
          message: 'Failed to create account, please try again later.'
        });
      }
      errorRef.current.focus();
      return;
    }

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
      } else {
        setError('root.serverError', {
          type: '400',
          message: 'Account created, but login failed. Please try again later.'
        });
        errorRef.current.focus();
      }
    }
  };

  return (
    <div className="my-auto flex h-fit w-[24rem] max-w-full flex-col gap-6 rounded-5xl border border-grayscale-25 p-8 shadow-2xl backdrop-blur-[1px] backdrop-brightness-95">
      <h1 className="text-nowrap text-h2 text-black">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="flex w-full flex-1 flex-col gap-4">
          <Input
            label="Username"
            id="username"
            className="w-full min-w-32"
            {...register('username', usernameValidation)}
          />
          <Input
            label="Password"
            id="password"
            className="w-full min-w-32"
            type="password"
            {...register('password', passwordValidation)}
          />
          <Input
            label="Confirm password"
            className="w-full min-w-32"
            id="confirm"
            type="password"
            {...register('confirm', {
              validate: (value) =>
                value === watch('password') || 'Passwords do not match.'
            })}
          />
          <div
            className={cn(
              'flex h-0 flex-row items-center justify-between transition-all duration-300',
              { 'h-12': !!errorMessage }
            )}
          >
            <p
              className={'text-p text-pink-medium'}
              aria-live="assertive"
              ref={errorRef}
              tabIndex="-1"
            >
              {errorMessage}
            </p>
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
              Create Account
            </Button>
            <Link to="/login">
              <Button
                hover="gray"
                size="lg"
                type="button"
              >
                To Login
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
