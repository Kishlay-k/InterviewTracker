import React from 'react';
import {Link} from 'react-router-dom';
import {getUserSelector} from '../../redux/user/userSelector';
import {connect} from 'react-redux';

import './header.scss';

const Header = ({user}) =>{

    // const [showCollapsedMenu, setState] = useState(false);
    // const toggleMenu = ()=>{
    //     setState(e => !e);
    // }

    return(
        // <nav className={`navbar navbar-expand-lg sticky-top p-0 ${showCollapsedMenu ? "nav-collapsed" : "" }`}>
        //     <Link to = '/' className = "navbar-brand link">{'<Interview Tracker>;'}</Link>
        //     <div className="navbar-toggler" type="button" onClick = {toggleMenu} data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        //         {'|<'}
        //     </div>
        //     <div className = {`collapse navbar-collapse ${showCollapsedMenu ? 'show' : ''}`} id="navbarText">
                
        //         {
        //             user ? 
        //                 <ul className="navbar-nav">
        //                     <li className="nav-item">
        //                         <Link className="nav-link" to = {`/${user.username}/profile`}>{user.username}<span className="sr-only">(current)</span></Link>
        //                     </li>
        //                     <li className="nav-item">
        //                         <Link className="nav-link" to = "/list?name=Favorite">My List<span className="sr-only">(current)</span></Link>
        //                     </li>
        //                     <li className="nav-item">
        //                         <Link className="nav-link" to="/friends">Friends<span className="sr-only">(current)</span></Link>
        //                     </li>
        //                     <li className="nav-item logout">
        //                         <Link className="nav-link" to="/logout">Logout</Link>
        //                     </li>
        //                 </ul>
                            
        //             : 
        //                 <ul className="navbar-nav">
        //                     <li className="nav-item login">
        //                         <Link className="nav-link" to = '/login'>Login<span className="sr-only">(current)</span></Link>
        //                     </li>
        //                 </ul>
        //         }
                
        //     </div>
        // </nav>


        <nav>
            {
                user ?
                    <div className="nav-bar">
                        <div className="nav-item-c brand">
                            <Link to = '/' className = "nav-link-c">{'<Interview Tracker>;'}</Link>
                        </div>

                        <Link className="nav-link-c nav-item-c" to = {`/${user.username}/profile`}>
                            <div className="">
                                {user.username}
                            </div>
                        </Link>

                        <Link className="nav-link-c nav-item-c" to = "/list?name=Favorite">
                            <div className="">
                                My List
                            </div>
                        </Link>

                        <Link className="nav-link-c nav-item-c" to="/friends">
                            <div className="">
                                Friends
                            </div>
                        </Link>

                        <Link className="nav-link-c nav-item-c logout" to="/logout">
                            <div className="">
                                Logout
                            </div>
                        </Link>
                    </div>
                :
                    <div className="nav-bar">
                        <div className="nav-item-c brand">
                            <Link to = '/' className = "nav-link-c">{'<Interview Tracker>;'}</Link>
                        </div>

                        <Link className="nav-link-c login nav-item-c" to = '/login'>
                            <div className="">
                                Login
                            </div>
                        </Link>
                    </div>
            }
        </nav>
    );
};

const mapStateToProps = (state) => ({
    user: getUserSelector(state),
});

export default connect(mapStateToProps)(Header);