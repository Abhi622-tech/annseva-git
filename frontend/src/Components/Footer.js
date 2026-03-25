import React from 'react';
import './styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: <a href="mailto:annsevaorg@gmail.com">annsevaorg@gmail.com</a></p>
                    <p>Phone: <a href="tel:+1234567890">+123 456 7890</a></p>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <p><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></p>
                    <p><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></p>
                    <p><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/aboutus">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
            <p>&copy; {currentYear} AnnSeva. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
