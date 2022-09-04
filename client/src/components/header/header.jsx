import React, {useState}from 'react';
import {Link} from 'react-router-dom';
import {getUserSelector} from '../../redux/user/userSelector';
import {connect} from 'react-redux';

const Header = ({user}) =>{
    const [showCollapsedMenu, setState] = useState(false);
    const toggleMenu = ()=>{
        setState(e => !e);
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <Link to = '/' className = 'navbar-brand'>Interview Tracker</Link>
        <button className="navbar-toggler" type="button" onClick = {toggleMenu} data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className = {`collapse navbar-collapse ${showCollapsedMenu ? 'show' : ''}`} id="navbarText">
            
            {
                user ? 
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to = {`/${user.username}/profile`}>{user.username}<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to = {`/list`}>My List<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </li>
                    </ul>
                        
                : 
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to = '/login'>Login<span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
            }
            
        </div>
        </nav>
    );
};

const mapStateToProps = (state) => ({
    user: getUserSelector(state),
});

export default connect(mapStateToProps)(Header);