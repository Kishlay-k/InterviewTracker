import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () =>{
    return(
      <header className = 'header'>

        <div className = 'container'>

            <div className = 'logo'>
                <Link to = '/'> <img src = "" alt = 'Hello' />  Interview Tracker </Link>
            </div>

            <div className = 'nav'>
                <Link className = 'nav-element' to = '/login'> Login</Link>
                <Link className = 'nav-element' to = '/logout'> Logout </Link>
                <Link className = 'nav-element' to = '/'><img scr = '' alt = 'hello' /></Link>
            </div>

        </div>
        
      </header>
    );
};

export default Header;