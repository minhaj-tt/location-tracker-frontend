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
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const UserProfile = ({ user, darkMode, setUser }) => {
  const userData = user;

  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(userData.image || "");

  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
    image: userData.image,
    dob: moment(userData.dob).format("YYYY-MM-DD"),
    address: userData.address,
    phoneNumber: userData.phone_number,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImagePreview(fileReader.result);
        setFormData((prev) => ({
          ...prev,
          image: fileReader.result,
        }));
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        dob: moment(formData.dob).format("YYYY-MM-DD"),
      };

      const response = await axios.put(
        `http://localhost:3000/api/auth/profile/${userData.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      const updatedUser = response.data.user;
      if (setUser) {
        setUser(updatedUser);
      }
      setFormData({
        username: updatedUser.username,
        email: updatedUser.email || userData.email,
        image: updatedUser.image,
        dob: moment(updatedUser.dob).format("YYYY-MM-DD"),
        address: updatedUser.address || "",
        phoneNumber: updatedUser.phoneNumber || "",
      });

      toast.success("Profile Updated Successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    }
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
              User Profile
            </Typography>

            <Avatar
              src={formData.image}
              alt={formData.username}
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
              {[
                { label: "Username", value: formData.username },
                { label: "Email", value: formData.email },
                { label: "Date of Birth", value: formData.dob },
                { label: "Address", value: formData.address },
                { label: "Phone Number", value: formData.phoneNumber },
              ].map(({ label, value }) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    sx={{
                      fontSize: "1.2rem",
                      color: darkMode ? "white" : "black",
                    }}
                  >
                    {label}:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      color: darkMode ? "white" : "black",
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
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
              sx={{
                textAlign: "center",
                marginBottom: 2,
                color: darkMode ? "white" : "black",
              }}
            >
              Edit Profile
            </Typography>

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
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                style: { color: darkMode ? "white" : "black" },
              }}
              InputProps={{
                style: { color: darkMode ? "white" : "black" },
              }}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              disabled
              InputLabelProps={{
                style: { color: darkMode ? "white" : "black" },
              }}
              InputProps={{
                style: { color: darkMode ? "white" : "black" },
              }}
            />

            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                style: { color: darkMode ? "white" : "black" },
              }}
              InputProps={{
                style: { color: darkMode ? "white" : "black" },
              }}
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                style: { color: darkMode ? "white" : "black" },
              }}
              InputProps={{
                style: { color: darkMode ? "white" : "black" },
              }}
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                style: { color: darkMode ? "white" : "black" },
              }}
              InputProps={{
                style: { color: darkMode ? "white" : "black" },
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
                      color: "white",
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
