/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Switch,
} from "@mui/material";
import UserProfile from "./UserProfile";

const Sidebar = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("UserProfile");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        marginTop: -1,
        marginBottom: -1,
        marginRight: -1,
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: darkMode
              ? "#333333"
              : "linear-gradient(145deg, #ffffff, #f0f0f0)",
            color: darkMode ? "#ffffff" : "#000000",
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Avatar
            src={user.image}
            alt={user.username}
            sx={{
              width: 80,
              height: 80,
              border: "3px solid #1976d2",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              mb: 2,
            }}
          />
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
            {user.username}
          </Typography>
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleTabChange("UserProfile")}
              sx={{
                background:
                  activeTab === "UserProfile"
                    ? "linear-gradient(90deg, #1976d2, #42a5f5)"
                    : "transparent",
                color: activeTab === "UserProfile" ? "#fff" : "inherit",
                "&:hover": {
                  background: "linear-gradient(90deg, #1565c0, #1e88e5)",
                  color: "#fff",
                },
                borderRadius: 2,
                margin: 0.5,
              }}
            >
              <ListItemText primary="User Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleTabChange("Settings")}
              sx={{
                background:
                  activeTab === "Settings"
                    ? "linear-gradient(90deg, #1976d2, #42a5f5)"
                    : "transparent",
                color: activeTab === "Settings" ? "#fff" : "inherit",
                "&:hover": {
                  background: "linear-gradient(90deg, #1565c0, #1e88e5)",
                  color: "#fff",
                },
                borderRadius: 2,
                margin: 0.5,
              }}
            >
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={onLogout}
              sx={{
                "&:hover": {
                  background: "linear-gradient(90deg, #d32f2f, #f44336)",
                  color: "#fff",
                },
                borderRadius: 2,
                margin: 0.5,
              }}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          pl: 4,
          pr: 4,
        }}
      >
        {activeTab === "UserProfile" && (
          <UserProfile user={user} darkMode={darkMode} />
        )}
        {activeTab === "Settings" && (
          <Box
            sx={{
              maxWidth: 500,
              width: 600,
              padding: 4,
              margin: "0 auto",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              sx={{ textAlign: "center", mb: 3 }}
            >
              Settings
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  sx={{ color: darkMode ? "#ffffff" : "#000000" }}
                >
                  Enable Notifications
                </Typography>
                <Switch
                  checked={notificationsEnabled}
                  onChange={() =>
                    setNotificationsEnabled(!notificationsEnabled)
                  }
                  sx={{
                    "& .MuiSwitch-switchBase": {
                      "&.Mui-checked": {
                        color: "#4caf50",
                        "& + .MuiSwitch-track": {
                          backgroundColor: "#4caf50",
                        },
                      },
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "#e0e0e0",
                      borderRadius: 20,
                    },
                    "& .MuiSwitch-thumb": {
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  sx={{ color: darkMode ? "#ffffff" : "#000000" }}
                >
                  Dark Mode
                </Typography>
                <Switch
                  checked={darkMode}
                  onChange={handleDarkModeChange}
                  sx={{
                    "& .MuiSwitch-switchBase": {
                      "&.Mui-checked": {
                        color: "#673ab7", // Active thumb color
                        "& + .MuiSwitch-track": {
                          backgroundColor: "#673ab7", // Active track color
                        },
                      },
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "#e0e0e0", // Default track color
                      borderRadius: 20,
                    },
                    "& .MuiSwitch-thumb": {
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                />
              </Box>

              {/* Sound Effects Switch */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  sx={{ color: darkMode ? "#ffffff" : "#000000" }}
                >
                  Sound Effects
                </Typography>
                <Switch
                  checked={soundEffects}
                  onChange={() => setSoundEffects(!soundEffects)}
                  sx={{
                    "& .MuiSwitch-switchBase": {
                      "&.Mui-checked": {
                        color: "#f44336", // Active thumb color
                        "& + .MuiSwitch-track": {
                          backgroundColor: "#f44336", // Active track color
                        },
                      },
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "#e0e0e0", // Default track color
                      borderRadius: 20,
                    },
                    "& .MuiSwitch-thumb": {
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
