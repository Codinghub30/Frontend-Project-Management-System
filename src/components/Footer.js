import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/status">Status</Link>
                <Link to="/report">Report</Link>
            </div>
            <div className="footer-social">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                </a>
                <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </a>
            </div>
            <div className="footer-contact">
                <p>Contact: anup@example.com</p>
                <p>Phone: +123 456 7890</p>
            </div>
            <div className="footer-note">
                <p>Made by Anup Kumar Chakra</p>
                <p>&copy; 2024 Anup Kumar Chakra. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
