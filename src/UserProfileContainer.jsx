/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Sidebar from "./ProfileSidebar";
import axios from "axios";

const UserProfileContainer = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("response", response);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    try {
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
      } else {
        console.log("No user data found in localStorage");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <Sidebar user={user} onLogout={onLogout} />;
};

export default UserProfileContainer;
