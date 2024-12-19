import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, Button, TextField, Typography } from "@mui/material";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error("Invalid or missing token");
      navigate("/login");
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.put(
        "http://localhost:3000/api/auth/update-password",
        { newPassword: formData.newPassword, token },
        { withCredentials: true }
      );
      toast.success("Password updated successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Password update failed", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    }
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
          Update Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />

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
            Update Password
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UpdatePassword;
