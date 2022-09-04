import React from 'react'
import Header from './components/header/header';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import ProblemSet from './pages/problemset/problemSet';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';


const Login = () => {
  return <h1>Login</h1>;
}

const Home = ({ history }) => {
  return <Redirect to={history.push('problemset')}/>;
}

const Signup = () => {
  return <h1>Signup</h1>;
}
const Error404 = () => {
  return <h1>Error</h1>;
}

const App = ({ history }) => {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/'><Home history={history}/></Route>
        <Route path='/problemset' component={ ProblemSet }/>
        <Route path='/login' component={ Login }/>
        <Route path='/signup' component={ Signup }/>
        <Route path = '*' component = {Error404}/>
      </Switch>
    </div>
  );
};

export default withRouter(App);