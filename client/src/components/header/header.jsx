import React, {useState}from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () =>{
  const [showCollapsedMenu, setState] = useState(false);


  const toggleMenu = ()=>{
    setState(e => !e);
  }

    return(
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark w-100">
        <Link to = '/' className = 'navbar-brand'>Interview Tracker</Link>
        <button className="navbar-toggler" type="button" onClick = {toggleMenu} data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className = {`collapse navbar-collapse ${showCollapsedMenu ? 'show' : ''}`} id="navbarText">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <Link className="nav-link" to = '/login'>Login<span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Signup</Link>
            </li>
          </ul>
        </div>

      </nav>
    );
};

export default Header;