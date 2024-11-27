/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Sidebar from "./ProfileSidebar";

const UserProfileContainer = ({ onLogout }) => {
  const [user, setUser] = useState(null);

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
