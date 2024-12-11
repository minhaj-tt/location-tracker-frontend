/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/reset-password",
        { email }
      );
      console.log("response", response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
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
          Forgot Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
