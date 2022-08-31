import React from 'react'
import Header from './components/header/header';
import './App.scss';
import { Route, Switch} from "react-router-dom";
import ProblemSet from './pages/problemset/problemSet';
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
  return <h1>Login</h1>;
}

const Signup = () => {
  return <h1>Signup</h1>;
}
const Error404 = () => {
  return <h1>Error</h1>;
}

const App = ({ isLoaded }) => {
  return (
    <div>
      <Header/>
      <Switch> 
        <Route path='/' component={ ProblemSet }/>
        <Route path='/login' component={ Login }/>
        <Route path='/signup' component={ Signup }/>
        <Route path = '*' component = {Error404}/>
      </Switch>
    </div>
  );
};

export default App;
