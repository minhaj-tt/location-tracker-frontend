import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SubscriptionCards from "./SubscriptionCard";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(
    "https://www.w3schools.com/w3images/avatar2.png"
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [userData, setUserData] = useState(null);

  console.log("userData", userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setFormData({
        ...formData,
        image: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData(response.data.user);
      console.log("response", response);
      setIsSignupSuccess(true);
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSubscriptionSelect = async (subscriptionType) => {
    console.log("working -------------");
    const userId = userData.id;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/create-checkout-session",
        { userId, subscriptionType }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      toast.error("Failed to initiate payment.");
    }
  };

  return (
    <div className="form-container">
      <h1>Sign Up</h1>
      {!isSignupSuccess ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Profile Image</label>
            <div
              onClick={() => document.getElementById("fileInput").click()}
              style={{
                cursor: "pointer",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                margin: "auto",
              }}
            >
              <img
                src={imagePreview}
                alt="Avatar Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <input
              type="file"
              id="fileInput"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
          <p style={{ textAlign: "center", marginTop: 10 }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      ) : (
        <div>
          <SubscriptionCards onSelectSubscription={handleSubscriptionSelect} />
        </div>
      )}
    </div>
  );
};

export default SignUp;
