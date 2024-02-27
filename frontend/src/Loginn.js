import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
export default function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
      });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [errorMessage, setErrorMessage] = useState('');
    const handleInput = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }
    const handlesubmit = async (event) => {
        event.preventDefault();
            try {
                const response = await axios.post('http://localhost:5000/loginn', credentials);
                const role = response.data.role;
                console.log(role);
                if (role === 'admin') {
                  // Redirect to admin page
                  navigate('/Admin');
      
                  console.log('Redirecting to Admin Page');
                } else if (role === 'user') {
                  // Redirect to home page
                  navigate('/Home');
                  console.log('Redirecting to Home Page');
                }
              } catch (error) {
                console.error('Error during login:', error);
                // Handle login error (e.g., display error message)
                setErrorMessage('Invalid credentials. Please try again.');
              }
        
    }
    return (
        <div className="container">
            <h2>Sign-In</h2>
            <form className="register-form" onSubmit={handlesubmit}>
                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" className="form-control" placeholder="Enter Email" name="email" onChange={handleInput} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter Password" name="password" onChange={handleInput} />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <button type="submit" className="login control">Sign In</button>

                <Link to="/Signup" className="login control">
                    <button className="login control">Create Account</button>
                </Link>
                {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error message */}
      </form>
        </div>
    )
}
