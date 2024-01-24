import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/login.css';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event: FormEvent) => {
        event.preventDefault();
        // Here you can add your authentication logic
        console.log('Login with:', username, password);

        // Navigate to the Discover page after login
        navigate('/discover');
    };

    return (
        <div className="login-page">
            <div className="login-form-container">
                <h1 className="login-title">POPCORNFLIX</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">LOGIN</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
