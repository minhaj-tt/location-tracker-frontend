import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          background: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ textAlign: "center", marginBottom: 3 }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography sx={{ color: "black", fontSize: "14px" }}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </Typography>
          </Box>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              background: "linear-gradient(90deg, #008080, #004d40)",
              color: "white",
              padding: "12px 0",
              marginTop: 2,
              "&:hover": {
                background: "linear-gradient(90deg, #004d40, #008080)",
              },
            }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: 2 }}
          >
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </form>
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Cookie Consent</DialogTitle>
        <DialogContent>
          <Typography>
            We use cookies to improve your experience. Do you accept cookies?
          </Typography>
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
    </Box>
  );
};

export default Login;
