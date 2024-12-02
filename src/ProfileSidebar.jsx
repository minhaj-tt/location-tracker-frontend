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
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import UserProfile from "./UserProfile";

const Sidebar = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("UserProfile");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [dataSaverMode, setDataSaverMode] = useState(false);
  const [language, setLanguage] = useState("en");

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

  // Handlers
  const handlePrivacyModeChange = () => setPrivacyMode((prev) => !prev);
  const handleDataSaverModeChange = () => setDataSaverMode((prev) => !prev);
  const handleLanguageChange = (event) => setLanguage(event.target.value);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        marginTop: -1,
        marginBottom: -1,
        marginRight: -1,
        backgroundColor: darkMode ? "#121212" : "#f4f4f4",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 280,
            boxSizing: "border-box",
            background: darkMode
              ? "linear-gradient(145deg, #333333, #1e1e1e)"
              : "linear-gradient(145deg, #ffffff, #e6e6e6)",
            color: darkMode ? "#ffffff" : "#000000",
            transition: "background-color 0.3s ease, color 0.3s ease",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Avatar
            src={user.image}
            alt={user.username}
            sx={{
              width: 100,
              height: 100,
              border: "4px solid #008080",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
              mb: 2,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#008080",
              letterSpacing: 1,
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            {user.username}
          </Typography>
        </Box>
        <List sx={{ mt: 3 }}>
          {["UserProfile", "Settings"].map((tab, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handleTabChange(tab)}
                sx={{
                  background:
                    activeTab === tab
                      ? "linear-gradient(90deg, #008080, #004d40)"
                      : "transparent",
                  color: activeTab === tab ? "#ffffff" : "#004d40",
                  "&:hover": {
                    background:
                      activeTab === tab
                        ? "linear-gradient(90deg, #004d40, #008080)"
                        : "#f0f0f0",
                    color: activeTab === tab ? "#ffffff" : "#004d40",
                  },
                  borderRadius: 3,
                  margin: 0.5,
                  border: activeTab === tab ? "none" : "1px solid #008080",
                  transition: "all 0.3s ease",
                  opacity: activeTab === tab ? 1 : 0.8,
                }}
              >
                <ListItemText
                  primary={tab === "UserProfile" ? "User Profile" : "Settings"}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: "auto", mb: 2 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={onLogout}
              sx={{
                background: "transparent",
                color: "red",
                "&:hover": {
                  background: "linear-gradient(90deg, #d32f2f, #f44336)",
                  color: "#ffffff",
                },
                border: "1px solid red",
                borderRadius: 3,
                margin: 0.5,
                transition: "all 0.3s ease",
                opacity: 0.8,
              }}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          p: 4,
        }}
      >
        {activeTab === "UserProfile" && (
          <UserProfile user={user} darkMode={darkMode} />
        )}
        {activeTab === "Settings" && (
          <Box
            sx={{
              maxWidth: "100%",
              p: 5,
              mx: "auto",
              bgcolor: darkMode ? "#2C2C2C" : "#F9F9F9",
              boxShadow: darkMode
                ? "0px 6px 30px rgba(0, 0, 0, 0.4)"
                : "0px 6px 30px rgba(0, 0, 0, 0.1)",
              borderRadius: 4,
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color={darkMode ? "white" : "#008080"}
              gutterBottom
              sx={{
                textAlign: "center",
                textShadow: darkMode
                  ? "1px 1px 2px rgba(0, 0, 0, 0.4)"
                  : "1px 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              Settings
            </Typography>
            <Grid container spacing={4} mt={1}>
              {/* Existing Settings */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    bgcolor: darkMode ? "#1F1F1F" : "#FFFFFF",
                    borderRadius: 2,
                    boxShadow: darkMode
                      ? "0px 2px 6px rgba(0, 0, 0, 0.5)"
                      : "0px 2px 6px rgba(0, 0, 0, 0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    sx={{ color: darkMode ? "#FFFFFF" : "#333333" }}
                  >
                    Enable Notifications
                  </Typography>
                  <Switch
                    checked={notificationsEnabled}
                    onChange={() =>
                      setNotificationsEnabled(!notificationsEnabled)
                    }
                    sx={{
                      "& .MuiSwitch-thumb": {
                        boxShadow: darkMode
                          ? "0px 3px 6px rgba(255, 255, 255, 0.3)"
                          : "0px 3px 6px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    bgcolor: darkMode ? "#1F1F1F" : "#FFFFFF",
                    borderRadius: 2,
                    boxShadow: darkMode
                      ? "0px 2px 6px rgba(0, 0, 0, 0.5)"
                      : "0px 2px 6px rgba(0, 0, 0, 0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    sx={{ color: darkMode ? "#FFFFFF" : "#333333" }}
                  >
                    Enable Dark Mode
                  </Typography>
                  <Switch
                    checked={darkMode}
                    onChange={handleDarkModeChange}
                    sx={{
                      "& .MuiSwitch-thumb": {
                        boxShadow: darkMode
                          ? "0px 3px 6px rgba(255, 255, 255, 0.3)"
                          : "0px 3px 6px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  />
                </Box>
              </Grid>

              {/* New Settings */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    bgcolor: darkMode ? "#1F1F1F" : "#FFFFFF",
                    borderRadius: 2,
                    boxShadow: darkMode
                      ? "0px 2px 6px rgba(0, 0, 0, 0.5)"
                      : "0px 2px 6px rgba(0, 0, 0, 0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    sx={{ color: darkMode ? "#FFFFFF" : "#333333" }}
                  >
                    Privacy Mode
                  </Typography>
                  <Switch
                    checked={privacyMode}
                    onChange={handlePrivacyModeChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    bgcolor: darkMode ? "#1F1F1F" : "#FFFFFF",
                    borderRadius: 2,
                    boxShadow: darkMode
                      ? "0px 2px 6px rgba(0, 0, 0, 0.5)"
                      : "0px 2px 6px rgba(0, 0, 0, 0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    sx={{ color: darkMode ? "#FFFFFF" : "#333333" }}
                  >
                    Data Saver Mode
                  </Typography>
                  <Switch
                    checked={dataSaverMode}
                    onChange={handleDataSaverModeChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    bgcolor: darkMode ? "#1F1F1F" : "#FFFFFF",
                    borderRadius: 2,
                    boxShadow: darkMode
                      ? "0px 2px 6px rgba(0, 0, 0, 0.5)"
                      : "0px 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    sx={{ color: darkMode ? "#FFFFFF" : "#333333" }}
                  >
                    Language
                  </Typography>
                  <Select
                    value={language}
                    onChange={handleLanguageChange}
                    sx={{
                      color: darkMode ? "#ffffff" : "#000000",
                    }}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                  </Select>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
