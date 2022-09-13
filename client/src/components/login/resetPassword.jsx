import React, {useState} from 'react';
import Form from '../form/formComponent';
import {useParams, useHistory} from 'react-router-dom';
import {resetPassword,changePassword} from '../../api/index.js';


export default function ResetPassword() {
    const {token} = useParams();
    const history = useHistory();

    //console.log(token,user);

    const [state, setstate] = useState({
        newPassword: '',
        confirmNP: '',
        currPassword: ''
    });

    const handleChange = (e)=>{
        setstate({...state, [e.target.name]: e.target.value})
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await resetPassword(token, state);
            history.push('/login');
            console.log(res);
        } catch {
            alert('Something Went Wrong!');
        }
    };

    const handleSubmit1 = async(e) => {
        e.preventDefault();
        try {
            const res = await changePassword(state);
            console.log(res);
            history.push('/');
        } catch (err) {
            alert(err.message);
        }
    }

    return (

        <div>

            {
                token ? 
                    <form className = "w-25 m-auto" onSubmit = {handleSubmit} >
                        <Form  name = "newPassword" value = {state.newPassword} type = "password" id = "#password" required = {true} handleChange = {handleChange} label = "New Password" />
                        <Form  name = "confirmNP" value = {state.confirmNP} type = "password" id = "#confirmPassword" required = {true} handleChange = {handleChange} label = "Confirm Password" />
                        <button className = "btn btn-primary btn-sm" type = "submit">Submit</button> 
                    </form>
                :
                    <form className = "w-25 m-auto" onSubmit = {handleSubmit1} >
                        <Form  name = "currPassword" value = {state.currPassword} type = "password" id = "#currPassword" required = {true} handleChange = {handleChange} label = "Current Password" />
                        <Form  name = "newPassword" value = {state.newPassword} type = "password" id = "#password" required = {true} handleChange = {handleChange} label = "New Password" />
                        <Form  name = "confirmNP" value = {state.confirmNP} type = "password" id = "#confirmPassword" required = {true} handleChange = {handleChange} label = "Confirm Password" />
                        <button className = "btn btn-primary btn-sm" type = "submit">Submit</button> 
                    </form>
            }



        </div>
    )
}
