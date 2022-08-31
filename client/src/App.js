import React from 'react'
import Header from './components/header/header';
import './App.scss';
import { Route, Switch, Redirect } from "react-router-dom";
import ProblemSet from './pages/problemset/problemSet';

const Login = () => {
  return <h1>Login</h1>;
}

const Home = () => {
  return <h1>Home</h1>;
}

const Logout = () => {
  return <h1>Logout</h1>;
}

const App = () => {
  return (
    <div>
      <Header/>
      <Switch> 
        <Route exact path='/' component={ ProblemSet }/>
        <Route path='/login' component={ Login }/>
        <Route path='/logout' component={ Logout }/>
      </Switch>
    </div>
  );
}

export default App;
