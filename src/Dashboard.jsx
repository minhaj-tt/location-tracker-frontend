import { useState, useEffect } from "react";
import TrialExpiredModal from "../trialExpiredModal";
import { useNavigate } from "react-router-dom";
import MapDashboard from "./Maps";

// eslint-disable-next-line react/prop-types
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
    <div>
      <h1>Dashboard</h1>

      <MapDashboard />

      <button
        style={{
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: "#008080",
        }}
        onClick={() => navigate("/subscription")}
      >
        Update Subscription
      </button>

      <button onClick={onLogout}>Logout</button>

      {isTrialExpired && (
        <TrialExpiredModal onClose={onLogout} onUpgrade={handleUpgrade} />
      )}
    </div>
  );
};

export default Dashboard;
