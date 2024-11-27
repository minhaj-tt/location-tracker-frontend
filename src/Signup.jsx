import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SubscriptionCards from "./SubscriptionCard";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const GradientButton = styled(Button)({
  background: "linear-gradient(to right, #008080, #00bfae)",
  color: "#fff",
  textTransform: "none",
  "&:hover": {
    background: "linear-gradient(to right, #006f6f, #00a594)",
  },
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: null,
    dob: "",
    address: "",
    phone_number: "",
  });

  const [imagePreview, setImagePreview] = useState(
    "https://www.w3schools.com/w3images/avatar2.png"
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setFormData({
        ...formData,
        image: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("dob", formData.dob);
    data.append("phone_number", formData.phone_number);
    data.append("address", formData.address);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData(response.data.user);
      setIsSignupSuccess(true);
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubscriptionSelect = async (subscriptionType) => {
    const userId = userData.id;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/create-checkout-session",
        { userId, subscriptionType }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      toast.error("Failed to initiate payment.");
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
        margin: "auto",
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
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        {!isSignupSuccess ? (
          <form onSubmit={handleSubmit}>
            <Box display="flex" justifyContent="center" mb={2}>
              <div
                onClick={() => document.getElementById("fileInput").click()}
                style={{
                  cursor: "pointer",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  margin: "auto",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Avatar Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <input
                type="file"
                id="fileInput"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </Box>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phone_number}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
            />
            <GradientButton
              fullWidth
              type="submit"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Sign Up"
              )}
            </GradientButton>
            <p style={{ textAlign: "center", marginTop: 10 }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        ) : (
          <Box>
            <SubscriptionCards
              onSelectSubscription={handleSubscriptionSelect}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SignUp;
