import SignUpForm from '@/components/auth/SignUpForm';
import useAuth from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

function SignUp() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.accessToken ? (
    <Navigate
      to="/dash"
      state={{ from: location }}
      replace
    />
  ) : (
    <div className="flex min-h-screen w-full justify-center px-4 py-16">
      <SignUpForm />
    </div>
  );
}

export default SignUp;
