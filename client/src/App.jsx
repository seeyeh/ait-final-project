import RequireAuth from '@/components/RequireAuth';
import DashHome from '@/routes/DashHome';
import DashLayout from '@/routes/DashLayout';
import Layout from '@/routes/Layout';
import Login from '@/routes/Login';
import NotFound from '@/routes/NotFound';
import Public from '@/routes/Public';
import SignUp from '@/routes/SignUp';
import { Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import DashHome from './routes/DashHome';
import DashLayout from './routes/DashLayout';
import Exercises from './routes/Exercises';
import Layout from './routes/Layout';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import Public from './routes/Public';
=======
>>>>>>> 381b42900232d4f6c8175e64cd7005971168a8bf

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
<<<<<<< HEAD
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<DashLayout />}>
              <Route path="dash" element={<DashHome />} />
              <Route path="exercises" element={<Exercises />} />
            </Route>
=======
        <Route element={<RequireAuth />}>
          <Route
            path="dash"
            element={<DashLayout />}
          >
            <Route
              index
              element={<DashHome />}
            />
>>>>>>> 381b42900232d4f6c8175e64cd7005971168a8bf
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
