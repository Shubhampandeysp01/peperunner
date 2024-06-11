import React, { useState } from 'react';
import { FaBars, FaTimes, FaTelegram, FaTwitter, FaGithub } from 'react-icons/fa';
import './Navbar.css';
import Logo from './logo.png';

interface NavbarProps {
  scrollToRef: (ref: React.RefObject<HTMLElement>) => void;
  homeRef: React.RefObject<HTMLElement>;
  tokenomicsRef: React.RefObject<HTMLElement>;
  howtoRef: React.RefObject<HTMLElement>;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToRef, homeRef, tokenomicsRef, howtoRef }) => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className={`navbar-menu ${isMobile ? 'active' : ''}`}>
        {/* <ul className="navbar-links"> */}
        <ul className="navbar-links">
          <li><a href="#home" onClick={() => scrollToRef(homeRef)}>Home</a></li></ul>
          <ul className="navbar-links">
          <li><a href="#tokenomics" onClick={() => scrollToRef(tokenomicsRef)}>Tokenomics</a></li>
          </ul>
          <ul className="navbar-links">
          <li><a href="#howto" onClick={() => scrollToRef(howtoRef)}>How to Play</a></li>
        </ul>
        <ul className="navbar-icons">
          <li className='icon'><a href="#facebook"><FaTelegram /></a></li>
          <li className='icon'><a href="#instagram"><FaTwitter /></a></li>
          <li className='icon'><a href="#github"><FaGithub /></a></li>
        </ul>
      </div>
      <div className="navbar-toggle" onClick={toggleMobileMenu}>
        {isMobile ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
