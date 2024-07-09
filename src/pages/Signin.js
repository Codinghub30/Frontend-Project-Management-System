import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../components/store/user/userSlice';
import '../Css/Signin.css';

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        try {
            const { email, password } = formData; 
            if (email === '' || password === '' || !email || !password) {
                return alert("All fields are important");
            }
            console.log(process.env.REACT_APP_BACKEND_URL);
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data);

            if (res.ok) {
                navigate('/');
                dispatch(setUser(formData));
                console.log("Data is login ");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
            <div className="signup-redirect">
                Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
            </div>
        </div>
    );
};

export default Signin;
