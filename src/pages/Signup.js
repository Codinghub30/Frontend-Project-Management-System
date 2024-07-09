import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../components/store/user/userSlice';   
import '../Css/Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    }

    const handleSubmit = async (e) => {
        const { username, email, password } = formData;
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:9004/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                alert('Account is successfully created. Login again!');
                dispatch(setUser(formData));
                navigate('/signin');
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="signup-container">
            <h1 className="signup-title">Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        className="form-input"
                        type="text"
                        placeholder="Enter your username"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        className="form-input"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        className="form-input"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>
                <button className="signup-button" type="submit">Sign Up</button>
            </form>
            <div className="signin-link-container">
                <p>Already have an account? <Link to="/signin">Sign In</Link></p>
            </div>
        </div>
    );
}

export default Signup;
