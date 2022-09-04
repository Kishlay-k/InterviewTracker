import React , {useState} from 'react';
import Form from '../form/formComponent';
import {login,signup} from '../../redux/user/userActions';
import {connect} from 'react-redux';
import './loginForm.scss';
import {withRouter, Link} from 'react-router-dom';
import {getUserSelector} from '../../redux/user/userSelector';

function LoginComponent({login,history,user,signup}) {

    if(user){
        history.push('/problemset');
    };

    const [toggle,setToggle] = useState(false);

    const [loginData,setLoginData] = useState({
        query: '',
        password: ''
    });

    const [signupData,setSignUpData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e)=>{
        if(toggle){
            setSignUpData({...signupData, [e.target.name]: e.target.value})
        }else{
            setLoginData({...loginData, [e.target.name]:e.target.value});
        }
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(toggle){
            signup(signupData,history);
        }else{
            login(loginData,history);
        }

    };

    return (
        <div>

            {
                toggle ?  
                    <div className = "form">
                        <form onSubmit = {handleSubmit}>
                            <Form name = "username" type = "text" value = {signupData.username} id = "#username" required = {true} handleChange = {handleChange} label = "Username" />
                            <Form  name = "email" type = "text" value = {signupData.email} id = "#email" required = {true} handleChange = {handleChange} label = "Email" />
                            <Form  name = "password" type = "password" value = {signupData.password} id = "#password" required = {true} handleChange = {handleChange} label = "Password" />
                            <Form  name = "confirmPassword" type = "password" value = {signupData.confirmPassword} id = "#confirmPassword" required = {true} handleChange = {handleChange} label = "ConfirmPassword" />
                            <button className = "btn btn-primary" type = "submit">Submit</button>
                            <div className="mt-2">Have an account? <span className = "acc" onClick = {()=> setToggle((e)=> !e) }>Login</span></div>
                        </form>
                    </div>
                :
                    <div className = "form">
                        <form onSubmit = {handleSubmit}>
                            <Form name = "query" type = "text" value = {loginData.query} id = "#query" required = {true} handleChange = {handleChange} label = "Username/Email" />
                            <Form  name = "password" type = "password" value = {loginData.password} id = "#password" required = {true} handleChange = {handleChange} label = "Password" />
                            <button className = "btn btn-primary" type = "submit">Submit</button> 
                            <div className="d-flex justify-content-between mt-2">
                                <div className = "acc" onClick = {()=> setToggle((e)=> !e) }>{`Create an account >`}</div>
                                <Link to = '/forgotpassword' className = "forgotPass">Forgot Password?</Link>
                            </div>
                        </form>
                    </div>
            }
        
        </div>

    )
};

const mapStateToProps = (state) => ({
    user: getUserSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    login: (body,history) => dispatch(login(body,history)),
    signup: (body,history) => dispatch(signup(body,history))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginComponent));