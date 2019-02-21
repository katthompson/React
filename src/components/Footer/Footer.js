import React from 'react';
//import {Route, NavLink} from 'react-router-dom';
import './Footer.css';

const footer = () => (
    
    <footer className="footer">
        <div className="footer-content">
            <p>Intercept POC - React Form</p>
            <p>&copy; {(new Date().getFullYear())}</p>
        </div>
    </footer>
);

export default footer;