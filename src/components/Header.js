import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from './Images/logo.png';
import profilePicture from './Images/profile.png';
import { signoutSuccess } from './store/user/userSlice'; // Ensure the correct import path

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    dispatch(signoutSuccess());
    navigate('/signin');
  };

  console.log('Current User:', currentUser); // Debugging log

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logoImg} alt="Not found" />
          </Link>
        </div>
        <nav className={`nav ${isOpen ? 'nav-active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item"><a href="/">Home</a></li>
            <li className="nav-item"><a href="/project">Projects</a></li>
            <li className="nav-item"><a href="/Task">Task</a></li>
            <li className="nav-item"><a href="/status">Status</a></li>
            <li className="nav-item"><a href="/report">Report</a></li>
          </ul>
        </nav>
        <div className="menu-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {currentUser ? (
          <div className="profile-section">
            {currentUser.profilePicture ? (
              <img
                src={currentUser.profilePicture}
                alt="Profile"
                className="profile-img"
                onClick={toggleDropdown}
              />
            ) : (
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-img"
                onClick={toggleDropdown}
              />
            )}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <button className='signin' onClick={() => navigate('/signin')}>Sign In</button>
        )}
      </div>
    </header>
  );
};

export default Header;
