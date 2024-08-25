import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} iNotebook. All rights reserved.</p>
        <p>
          <a href="/about">About Us</a> | <a href="/">Privacy Policy</a> | <a href="/">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
