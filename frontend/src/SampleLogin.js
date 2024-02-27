import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

 function SampleLogin() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
      });
      const navigate = useNavigate();
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
      };
    
      const handleLogin = async (e) => {
        e.preventDefault();
    
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
        }
      };
    
  return (
    <div>
        <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" name="email" value={credentials.email} onChange={handleInputChange} />

        <label>Password:</label>
        <input type="password" name="password" value={credentials.password} onChange={handleInputChange} />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default SampleLogin
