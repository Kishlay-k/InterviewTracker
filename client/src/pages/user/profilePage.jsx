import React from 'react';
import {connect} from 'react-redux';
import {getUserSelector} from '../../redux/user/userSelector.js';
import {Switch, Route,Redirect,withRouter,Link} from 'react-router-dom';
import ResetPassword from '../../components/login/resetPassword'

const Temp = ({match}) => {
    return (
        <div>
        <h2>PP</h2>
        <Link to = {`${match.url}/resetpassword`}>Change Password</Link>
        </div>
    )
}

const ProfilePage = ({user,match}) => {
   
     if (user === undefined) {
        console.log('Not User');
        return <Redirect to = '/login'></Redirect>;
    }

    return (
        <div>
            <Switch>
                <Route exact path = {`${match.path}`}><Temp match = {match}/></Route>
                <Route exact path = {`${match.path}/resetpassword`} component = {ResetPassword}></Route>
            </Switch>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: getUserSelector(state),
});
  
export default withRouter(connect(mapStateToProps)(ProfilePage));