import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setErrors([{ msg: 'Passwords do not match' }]);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            })

            const data = await response.json()

            if (response.ok){
                navigate('/upload')
            }else{
                const errorData = Array.isArray(data.errors) ? data.errors : [{ msg: data.message || 'Registration failed' }];
                setErrors(errorData);
            }
        } catch (err) {
            setErrors([{ msg: 'Network failure. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <div className='auth-header'>
                    <i className="fas fa-user-plus" style={{ fontSize: '2rem', color: '#0095f6', marginBottom: '10px' }}></i>
                    <h2>Create Account</h2>
                </div>

                {errors.length > 0 && (
                    <div className='error-container'>
                        {errors.map((error, index) => (
                            <p key={index} className='error-msg'>{error.msg}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='auth-form'>
                    <div className='input-group'>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email Address" 
                            value={formData.email}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className='input-group'>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className='input-group'>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="Confirm Password" 
                            value={formData.confirmPassword}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit" className='btn-primary' disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <div className='auth-footer'>
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                    <Link to="/" className='back-link'>← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}