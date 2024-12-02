/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper } from "@mui/material";
import TrialExpiredModal from "../trialExpiredModal";
import MapDashboard from "./Maps";
import ChatBot from "./Chatbot";

const Dashboard = ({ onLogout }) => {
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (
      userData?.trialEndDate &&
      new Date() > new Date(userData?.trialEndDate)
    ) {
      setIsTrialExpired(true);
    }
  }, []);

  const handleUpgrade = () => {
    console.log("Navigating to the subscription page...");
  };

  const themeColors = {
    primary: "#008080",
    secondary: "#004d40",
    primaryHover: "#004d40",
    secondaryHover: "#00695c",
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
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            textAlign: "center",
            color: themeColors.primary,
            marginBottom: 3,
          }}
        >
          Dashboard
        </Typography>

        <MapDashboard />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "350px",
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              background: themeColors.primary,
              "&:hover": {
                background: themeColors.primaryHover,
              },
            }}
            onClick={() => navigate("/subscription")}
          >
            Update Subscription
          </Button>

          <Button
            variant="outlined"
            sx={{
              width: "350px",
              borderColor: themeColors.primary,
              color: themeColors.primary,
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: themeColors.secondary,
                color: "white",
              },
            }}
            onClick={() => navigate("/user-profile")}
          >
            Go to User Profile
          </Button>
        </Box>

        {isTrialExpired && (
          <TrialExpiredModal onClose={onLogout} onUpgrade={handleUpgrade} />
        )}
      </Paper>

      <ChatBot themeColors={themeColors} />
    </Box>
  );
};

export default Dashboard;
