/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Button,
  Paper,
  TextField,
} from "@mui/material";

const UserProfile = ({ user, darkMode }) => {
  const userData = user;

  const [isEditing, setIsEditing] = useState(false);

  console.log("darkMode", darkMode);

  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
    image: userData.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Profile updated:", formData);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          maxWidth: 500,
          width: 600,
          padding: 4,
          borderRadius: 4,
          border: darkMode ? "1px solid #444" : "1px solid #d1d1d1",
          background: darkMode
            ? "linear-gradient(145deg, #333333, #2c2c2c)"
            : "linear-gradient(145deg, #ffffff, #f0f0f0)",
        }}
      >
        {!isEditing ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color={darkMode ? "white" : "primary"}
              gutterBottom
              sx={{
                textShadow: darkMode
                  ? "1px 1px 2px rgba(0, 0, 0, 0.4)"
                  : "1px 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              Profile
            </Typography>

            <Avatar
              src={userData.image}
              alt={userData.username}
              sx={{
                width: 120,
                height: 120,
                border: darkMode ? "4px solid #1976d2" : "4px solid #1976d2",
                boxShadow: darkMode
                  ? "0px 4px 10px rgba(255, 255, 255, 0.2)"
                  : "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />

            <Box sx={{ width: "100%", textAlign: "left" }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color={darkMode ? "text.secondary" : "text.secondary"}
              >
                Username:
              </Typography>
              <Typography
                variant="body1"
                color={darkMode ? "white" : "text.primary"}
                sx={{ marginBottom: 2 }}
              >
                {userData.username}
              </Typography>

              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color={darkMode ? "text.secondary" : "text.secondary"}
              >
                Email:
              </Typography>
              <Typography
                variant="body1"
                color={darkMode ? "white" : "text.primary"}
              >
                {userData.email}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setIsEditing(true)}
                  sx={{
                    borderRadius: 3,
                    fontWeight: "bold",
                    padding: "10px 20px",
                    background: darkMode
                      ? "linear-gradient(90deg, #1976d2, #42a5f5)"
                      : "linear-gradient(90deg, #1976d2, #42a5f5)",
                    boxShadow: darkMode
                      ? "0px 3px 6px rgba(255, 255, 255, 0.16)"
                      : "0px 3px 6px rgba(0, 0, 0, 0.16)",
                    textTransform: "none",
                    "&:hover": {
                      background: darkMode
                        ? "linear-gradient(90deg, #1565c0, #1e88e5)"
                        : "linear-gradient(90deg, #1565c0, #1e88e5)",
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color={darkMode ? "white" : "primary"}
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              Edit Profile
            </Typography>

            <TextField
              label="Profile Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
                input: {
                  color: darkMode ? "white" : "black", // input text color
                },
              }}
            />

            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
                input: {
                  color: darkMode ? "white" : "black",
                },
              }}
            />

            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
                input: {
                  color: darkMode ? "white" : "black",
                },
              }}
            />

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSave}
                  sx={{
                    borderRadius: 3,
                    fontWeight: "bold",
                    padding: "10px 20px",
                    background: darkMode
                      ? "linear-gradient(90deg, #43a047, #66bb6a)"
                      : "linear-gradient(90deg, #43a047, #66bb6a)",
                    "&:hover": {
                      background: darkMode
                        ? "linear-gradient(90deg, #2e7d32, #388e3c)"
                        : "linear-gradient(90deg, #2e7d32, #388e3c)",
                    },
                  }}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setIsEditing(false)}
                  sx={{
                    color: darkMode ? "#d32f2f" : "#d32f2f",
                    borderRadius: 3,
                    fontWeight: "bold",
                    padding: "10px 20px",
                    border: darkMode
                      ? "2px solid #d32f2f"
                      : "2px solid #d32f2f",
                    "&:hover": {
                      background: darkMode ? "#d32f2f" : "#d32f2f",
                      color: darkMode ? "white" : "white",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default UserProfile;
