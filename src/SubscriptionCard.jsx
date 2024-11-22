import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const SubscriptionCards = ({ onSelectSubscription }) => {
    const packages = [
        {
            title: 'Standard Package',
            duration: '1 Month',
            price: '$10',
            benefits: ['Access to basic features', 'Email support', '1 user per account'],
            type: 'standard',
        },
        {
            title: 'Premium Package',
            duration: '1 Year',
            price: '$100',
            benefits: ['Access to all features', 'Priority support', 'Up to 5 users per account'],
            type: 'premium',
        },
    ];

    const handleSkipTrial = () => {
        toast.success("7-day free trial started!");
        window.location.href = "/login";
    };

    return (
        <>
            <div style={styles.cardContainer}>
                {packages.map((pkg) => (
                    <div key={pkg.type} style={styles.card}>
                        <h3 style={styles.title}>{pkg.title}</h3>
                        <p style={styles.duration}><strong>Duration:</strong> {pkg.duration}</p>
                        <p style={styles.price}><strong>Price:</strong> {pkg.price}</p>
                        <ul style={styles.benefitsList}>
                            {pkg.benefits.map((benefit, index) => (
                                <li key={index} style={styles.benefit}>{benefit}</li>
                            ))}
                        </ul>
                        <button
                            style={styles.button}
                            onClick={() => onSelectSubscription(pkg.type)}
                        >
                            Upgrade to {pkg.title}
                        </button>
                    </div>
                ))}

            </div>

            <button
                style={styles.skipButton}
                onClick={handleSkipTrial}
            >
                Skip for Now (Start 7-Day Free Trial)
            </button></>
    );
};

const styles = {
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '20px',
        marginTop: '20px',
    },
    card: {
        width: '280px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
    },
    title: {
        color: '#333',
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    duration: {
        fontSize: '1rem',
        color: '#666',
        margin: '5px 0',
    },
    price: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: '15px',
    },
    benefitsList: {
        listStyleType: 'none',
        padding: 0,
        marginBottom: '20px',
        color: '#444',
    },
    benefit: {
        fontSize: '0.9rem',
        margin: '5px 0',
    },
    button: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    skipButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginTop: '20px',
    },
};

export default SubscriptionCards;
