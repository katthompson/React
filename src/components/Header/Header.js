import React, {Component} from 'react';
//import {NavLink} from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.png';
import Navigation from '../Navigation/Navigation';

class Header extends Component {

    state = {
        toggled:'',
        mobileMenu:'closed'
    }

    menuToggleHandler = () => {
        const currentToggle = this.state.toggled;
        const currentMobileMenu = this.state.mobileMenu;
        this.setState({toggled: !currentToggle});
        this.setState({mobileMenu: !currentMobileMenu});
    }

    menuClickLinkHandler = () => {
        const currentMobileMenu = this.state.mobileMenu;
        const currentToggle = this.state.toggled;
        this.setState({mobileMenu: !currentMobileMenu});
        this.setState({toggled: !currentToggle});
    }

    render() {
        return (
            
                <header className="header">
                    <div className="header-content">
                        <div className="logo"><img src={logo} alt="logo"/></div>
                        <p>Intercept POC - React Form</p>
                        <nav className="desktop">
                            <Navigation />
                        </nav>
                        <div className={`menu mobile ${this.state.toggled ? 'change' : null} `} 
                            onClick={this.menuToggleHandler}>
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </div>
                        <nav className={`mobile ${this.state.mobileMenu ? 'closed' : null}` }>
                            <Navigation clicked={this.menuClickLinkHandler}/>
                        </nav>
                    </div>
                </header>
        );
    }
    
}



export default Header;