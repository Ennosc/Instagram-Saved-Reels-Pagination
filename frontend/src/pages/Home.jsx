import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleLogin = () => navigate('/login');
    const handleSignup = () => navigate('/signup');

    const handleGuestAccess = async () => {
        try {
            const response = await fetch('/api/auth/guest', {
                credentials: 'include'
            });
            if (response.ok) {
                navigate('/saved');
            }
        } catch (err) {
            console.log('Guest Mode not working ', err);
        }
    };

    return (
        <div className='home-container'>
            <div className='home-card'>
                <div className='home-header'>
                    <i className="fab fa-instagram" style={{ fontSize: '3rem', marginBottom: '1rem', color: "lightgrey" }}></i>
                    <h1>Instagram Saved Reels</h1>
                    <p>Browse your saved reels by page.</p>
                </div>
                
                <div className='home-actions'>
                    <button className='btn-primary' onClick={handleLogin}>
                        Login
                    </button>
                    <button className='btn-secondary' onClick={handleSignup}>
                        Create Account
                    </button>
                    <div className='divider'>
                        <span>OR</span>
                    </div>
                    <button className='btn-guest' onClick={handleGuestAccess}>
                        <i className="fas fa-flask"></i> Try Test Data (Guest)
                    </button>
                </div>
            </div>
        </div>
    );
}