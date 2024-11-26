import { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

const OtpScreen = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      alert(`OTP Submitted: ${otpValue}`);
    } else {
      alert("Please complete the OTP.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Enter OTP
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        {otp.map((_, index) => (
          <TextField
            key={index}
            id={`otp-${index}`}
            value={otp[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: "1.5rem",
                width: "3rem",
                height: "3rem",
              },
            }}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 3, textTransform: "none" }}
        onClick={handleSubmit}
      >
        Verify OTP
      </Button>
    </Box>
  );
};

export default OtpScreen;
