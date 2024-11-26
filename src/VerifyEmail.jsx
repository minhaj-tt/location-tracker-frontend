import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("Invalid or missing token.");
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:3000/api/auth/verify-email`,
          { token }
        );
        if (response.data.success) {
          setStatus("Email verified successfully! Redirecting...");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus("Verification failed. Please try again.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("An error occurred during verification.");
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{status}</p>
    </div>
  );
};

export default VerifyEmail;
