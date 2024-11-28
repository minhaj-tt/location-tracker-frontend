/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Button,
  TextField,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import UpdatePasswordModal from "./UpdatePasswordModal";

const UserProfile = ({ user, darkMode, setUser }) => {
  const userData = user;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(userData.image || "");

  const description =
    "With a proven track record in the computer software industry, I bring extensive expertise as a MERN Stack Developer. I am proficient in technologies such as React.js, React Native, Next.js, Node.js, and WordPress, enabling me to create robust and scalable web applications. My strong analytical skills and excellent communication abilities have been key in building successful client partnerships. Holding a Bachelors degree in Computer Science from Lahore Garrison University, I continuously seek professional growth to stay ahead of industry trends. Dedicated to delivering top-notch results with maximum efficiency, I am a valuable asset to any collaborative team. Lets innovate and enhance the digital experience together.";

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
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={formData.image}
            alt={formData.username}
            sx={{
              width: 100,
              height: 100,
              border: darkMode ? "4px solid #1976d2" : "4px solid #1976d2",
              boxShadow: darkMode
                ? "0px 4px 10px rgba(255, 255, 255, 0.2)"
                : "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
          <Box>
            <Typography
              fontWeight="bold"
              color={darkMode ? "white" : "primary"}
              sx={{
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {formData.username} ✅
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Rating
                value={4.5}
                precision={0.1}
                readOnly
                size="small"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "green",
                  },
                  "& .MuiRating-iconHover": {
                    color: "green",
                  },
                }}
              />
              <Typography
                sx={{
                  color: darkMode ? "white" : "green",
                  fontSize: "0.9rem",
                }}
              >
                4.5
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: "100%", textAlign: "left", mt: 5, mb: 5 }}>
          {[
            { label: "Description", value: description },
            { label: "Email", value: formData.email },
            { label: "Date of Birth", value: formData.dob },
            { label: "Address", value: formData.address },
            { label: "Phone Number", value: formData.phoneNumber },
          ].map(({ label, value }) => (
            <Box
              key={label}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.7,
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  mt: 1,
                  fontSize: "1.2rem",
                  color: darkMode ? "white" : "#000000",
                }}
              >
                {label}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: darkMode ? "white" : "black",
                }}
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setIsModalOpen(true)}
              sx={{
                borderRadius: 3,
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Edit Profile
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setIsPasswordModalOpen(true)}
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
              Update Password
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fullWidth
      >
        <DialogTitle
          sx={{
            backgroundColor: darkMode ? "#000000" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000",
          }}
        >
          Edit Profile
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: darkMode ? "#000000" : "#ffffff",
          }}
        >
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
            sx={{ mt: 2 }}
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
            sx={{ mt: 2 }}
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
            sx={{ mt: 2 }}
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
            sx={{ mt: 2 }}
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
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: darkMode ? "#000000" : "#ffffff",
          }}
        >
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
                onClick={() => setIsModalOpen(false)}
                sx={{
                  color: darkMode ? "#d32f2f" : "#d32f2f",
                  borderRadius: 3,
                  fontWeight: "bold",
                  padding: "10px 20px",
                  border: darkMode ? "2px solid #d32f2f" : "2px solid #d32f2f",
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
        </DialogActions>
      </Dialog>

      <UpdatePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userId={user.id}
        darkMode={darkMode}
      />
    </>
  );
};

export default UserProfile;
