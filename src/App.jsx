import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./Login";
import SignUp from "./Signup";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Dashboard";
import Subscription from "./Subscription";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import VerifyEmail from "./VerifyEmail";
import OtpScreen from "./OTP";
import UserProfileContainer from "./UserProfileContainer";
import Calendar from "./Calendar";
import ForgotPassword from "./ForgotPassword";
import UpdatePassword from "./UpdatePassword";

const App = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
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
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/otp" element={<OtpScreen />} />
      <Route
        path="/user-profile"
        element={<UserProfileContainer onLogout={handleLogout} />}
      />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/update-password" element={<UpdatePassword />} />
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
