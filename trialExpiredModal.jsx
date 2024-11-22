import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const TrialExpiredModal = ({ onClose, onUpgrade }) => {
    const navigate = useNavigate();

    const handleUpgrade = () => {
        onUpgrade();
        navigate('/subscription');
    };

    const handleLogout = () => {
        onClose();
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        navigate('/login');
    };

    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const modalContentStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        width: '400px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        margin: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#0056b3',
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h2>Your 7-Day Trial has Ended</h2>
                <p>To continue enjoying our services, please upgrade your subscription.</p>
                <div>
                    <button
                        style={buttonStyle}
                        onClick={handleUpgrade}
                        onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    >
                        Upgrade Now
                    </button>
                    <button
                        style={buttonStyle}
                        onClick={handleLogout}
                        onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    >
                        Not Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrialExpiredModal;
