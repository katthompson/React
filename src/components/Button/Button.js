import React from 'react';
import './Button.css';

const button = (props) => (
    <button
        //className="button" 
        className={`button ${props.btnType}`} // to add another class through a prop
        onClick={props.clicked}>
        {props.children}
        </button>
);

export default button;