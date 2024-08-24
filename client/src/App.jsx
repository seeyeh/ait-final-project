import PersistLogin from '@/components/PersistLogin';
import RequireAuth from '@/components/RequireAuth';
import DashHome from '@/routes/DashHome';
import DashLayout from '@/routes/DashLayout';
import Layout from '@/routes/Layout';
import Login from '@/routes/Login';
import NotFound from '@/routes/NotFound';
import Public from '@/routes/Public';
import SignUp from '@/routes/SignUp';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<Public />}
        />
        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="sign-up"
          element={<SignUp />}
        />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route
              path="dash"
              element={<DashLayout />}
            >
              <Route
                index
                element={<DashHome />}
              />
            </Route>
          </Route>
        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}

export default App;
