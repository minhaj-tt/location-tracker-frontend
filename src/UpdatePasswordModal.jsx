/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import axios from "axios";

const UpdatePasswordModal = ({ open, onClose, userId, darkMode }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    const passwordStrengthRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordStrengthRegex.test(newPassword)) {
      toast.error(
        "New password must contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/auth/update-password/${userId}`,
        {
          oldPassword: currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose();
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          backgroundColor: darkMode ? "#000000" : "#ffffff",
          color: darkMode ? "#ffffff" : "#000000",
        }}
      >
        Update Password
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: darkMode ? "white" : "black",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: darkMode ? "#000000" : "#ffffff",
        }}
      >
        <TextField
          label="Current Password"
          type="password"
          fullWidth
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          sx={{ marginBottom: 2, mt: 1 }}
          InputLabelProps={{
            style: { color: darkMode ? "white" : "black" },
          }}
          InputProps={{
            style: { color: darkMode ? "white" : "black" },
          }}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            style: { color: darkMode ? "white" : "black" },
          }}
          InputProps={{
            style: { color: darkMode ? "white" : "black" },
          }}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputLabelProps={{
            style: { color: darkMode ? "white" : "black" },
          }}
          InputProps={{
            style: { color: darkMode ? "white" : "black" },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: darkMode ? "#000000" : "#ffffff",
        }}
      >
        <Grid sx={{ pl: 2, pr: 2 }} container spacing={3}>
          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={handleUpdatePassword}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 3,
                fontWeight: "bold",
                padding: "10px 20px",
                background: "linear-gradient(90deg, #008080, #004d40)",
                color: "white",
                "&:hover": {
                  background: "linear-gradient(90deg, #004d40, #008080)",
                },
              }}
            >
              Update
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={onClose}
              variant="outlined"
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
  );
};

export default UpdatePasswordModal;
