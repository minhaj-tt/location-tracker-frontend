/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper } from "@mui/material";
import TrialExpiredModal from "../trialExpiredModal";
import MapDashboard from "./Maps";

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
            color: "#00695c",
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
              background: "linear-gradient(90deg, #008080, #004d40)",
              "&:hover": {
                background: "linear-gradient(90deg, #004d40, #008080)",
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
              borderColor: "#008080",
              color: "#008080",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#004d40",
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
    </Box>
  );
};

export default Dashboard;
