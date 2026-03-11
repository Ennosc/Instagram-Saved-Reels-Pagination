import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        setIsLoading(true);

        try{
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
                credentials: 'include'
            })

            const data = await response.json()

            if (response.ok) {
                navigate('/saved')
            }else {
                const errorData = Array.isArray(data.errors) ? data.errors : [{ msg: data.message || 'Login failed' }];
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
                    <i className="fas fa-lock-open" style={{ fontSize: '2rem', color: '#0095f6', marginBottom: '10px' }}></i>
                    <h2>Welcome Back</h2>
                    <p>Please enter your details</p>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                        />
                    </div>
                    <div className='input-group'>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className='btn-primary' disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Login'}
                    </button>
                </form>

                <div className='auth-footer'>
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    <Link to="/" className='back-link'>← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}