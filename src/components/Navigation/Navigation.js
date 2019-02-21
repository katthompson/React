import React from 'react';
import {NavLink} from 'react-router-dom';
import './Navigation.css';

const navigationUL = (props) => (
   <ul>
       <li><NavLink to='/' exact onClick={props.clicked}>Home</NavLink></li>
       <li><NavLink to='/form' exact onClick={props.clicked}>Form</NavLink></li>

   </ul> 
);

export default navigationUL;

