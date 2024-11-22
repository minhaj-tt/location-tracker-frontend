import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        { withCredentials: true }
      );

      const authToken = response.data.token;
      const userData = response.data.user;
      setUserData(userData);
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("userData", JSON.stringify(userData));
      toast.success("Logged in successfully!");
      setOpenModal(true);
    } catch (error) {
      console.error("Login failed!", error);
      toast.error("Login failed! Please check your credentials.");
    }
  };

  const handleAcceptCookies = () => {
    Cookies.set("userData", JSON.stringify(userData), { expires: 1 });
    Cookies.set("cookiesAccepted", "true", { expires: 365 });
    setOpenModal(false);
    toast.success("Cookies accepted!");
    navigate("/");
  };

  const handleDeclineCookies = () => {
    Cookies.set("cookiesAccepted", "false", { expires: 365 });
    setOpenModal(false);
    toast.info("Cookies declined.");
    navigate("/");
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
        <p style={{ textAlign: "center", marginTop: 10 }}>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Cookie Consent</DialogTitle>
        <DialogContent>
          <p>
            We use cookies to improve your experience. Do you accept cookies?
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "red",
              color: "#fff",
              textTransform: "none",
            }}
            onClick={handleDeclineCookies}
          >
            Decline
          </Button>
          <Button
            sx={{
              backgroundColor: "#008080",
              color: "#fff",
              textTransform: "none",
            }}
            onClick={handleAcceptCookies}
            color="primary"
            autoFocus
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
