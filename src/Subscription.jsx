import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Subscription = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const packages = [
    {
      title: "Standard Package",
      duration: "1 Month",
      price: "$10",
      benefits: [
        "Access to basic features",
        "Email support",
        "1 user per account",
      ],
      type: "standard",
    },
    {
      title: "Premium Package",
      duration: "1 Year",
      price: "$100",
      benefits: [
        "Access to all features",
        "Priority support",
        "Up to 5 users per account",
      ],
      type: "premium",
    },
  ];

  const handleSubscriptionSelect = async (subscriptionType) => {
    const userId = userData.id;
    try {
      await axios.put("http://localhost:3000/api/auth/upgrade-subscription", {
        userId,
        newSubscription: subscriptionType,
      });

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

  const handleCancelSubscription = async () => {
    const userId = userData.id;
    try {
      await axios.put("http://localhost:3000/api/auth/cancel-subscription", {
        userId,
      });

      toast.success("Subscription canceled successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error canceling subscription:", error);
      toast.error("Failed to cancel subscription.");
    }
  };

  return (
    <>
      <div style={styles.cardContainer}>
        {packages.map((pkg) => (
          <div key={pkg.type} style={styles.card}>
            <h3 style={styles.title}>{pkg.title}</h3>
            <p style={styles.duration}>
              <strong>Duration:</strong> {pkg.duration}
            </p>
            <p style={styles.price}>
              <strong>Price:</strong> {pkg.price}
            </p>
            <ul style={styles.benefitsList}>
              {pkg.benefits.map((benefit, index) => (
                <li key={index} style={styles.benefit}>
                  {benefit}
                </li>
              ))}
            </ul>
            {userData?.subscription === pkg?.type ? (
              <button style={styles.selectedButton}>Selected</button>
            ) : (
              <button
                style={styles.button}
                onClick={() => handleSubscriptionSelect(pkg.type)}
              >
                Upgrade to {pkg.title}
              </button>
            )}
          </div>
        ))}
      </div>
      {userData?.subscription !== "free" && (
        <button style={styles.cancelButton} onClick={handleCancelSubscription}>
          Cancel Subscription
        </button>
      )}
    </>
  );
};

export default Subscription;

const styles = {
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    width: "280px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  },
  title: {
    color: "#333",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  duration: {
    fontSize: "1rem",
    color: "#666",
    margin: "5px 0",
  },
  price: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: "15px",
  },
  benefitsList: {
    listStyleType: "none",
    padding: 0,
    marginBottom: "20px",
    color: "#444",
  },
  benefit: {
    fontSize: "0.9rem",
    margin: "5px 0",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  selectedButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "default",
    fontSize: "1rem",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "20px",
  },
};
