import { Routes, Route } from 'react-router-dom';
import Layout from './routes/Layout';
import Public from './routes/Public';
import Login from './routes/Login';
import DashLayout from './routes/DashLayout';
import NotFound from './routes/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="dash" element={<DashLayout />}></Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
