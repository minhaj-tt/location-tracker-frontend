import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './Signup';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Dashboard';
import Subscription from './Subscription';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';


const App = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/subscription" element={<Subscription />} />
    </Routes>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
    <ToastContainer />
  </Router>
);

export default AppWrapper;
