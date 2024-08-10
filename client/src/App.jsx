import { Routes, Route } from 'react-router-dom';
import Layout from './routes/Layout';
import Public from './routes/Public';
import Login from './routes/Login';
import DashLayout from './routes/DashLayout';
import NotFound from './routes/NotFound';
import DashHome from './routes/DashHome';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="dash" element={<DashLayout />}>
            <Route index element={<DashHome />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
