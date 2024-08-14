import { Route, Routes } from 'react-router-dom';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import DashHome from './routes/DashHome';
import DashLayout from './routes/DashLayout';
import Exercises from './routes/Exercises';
import Layout from './routes/Layout';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import Public from './routes/Public';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<DashLayout />}>
              <Route path="dash" element={<DashHome />} />
              <Route path="exercises" element={<Exercises />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
