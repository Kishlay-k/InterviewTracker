import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {getUserSelector} from '../../redux/user/userSelector';
import { connect } from 'react-redux';
import Form from '../form/formComponent';
import {updateDetails,updateProfilePhoto} from '../../api/index';
import {updatePhoto} from '../../redux/user/userActions';

import './profileComponent.scss';

function ProfileComponent({match, user, updatePhoto}) {

    const [file, setfile] = useState(null);
    const [email, setemail] = useState('');

    let value = '';

    if (user) {
        value = user.email;
    }

    const handleEmailChange = (e) => {
        setemail(e.target.value);
    }

    const handlePhotoChange = (event) => {
        setfile(event.target.files[0]);
    }

    const handlePhotoSubmit = async(e)=>{
        e.preventDefault();
        let data = new FormData();
        data.append('photo', file);
        try {
            const res = await updateProfilePhoto(data);
            updatePhoto(res.data.photo);
            setfile(null);
            alert("success");
        } catch(err) {
            alert(err.response.data.message)
        }
    };

    const handleDetailSubmit = async(e)=>{
        e.preventDefault();
        try{
            await updateDetails({email});
            alert("success");
        } catch(err) {
            console.log(err.response);
            alert(err.response?.data.message);
        }
    };

    return (
        <div>
            <h2>Profile Page</h2>

            <div className="container">
                {
                    user ? <img src={`http://localhost:4000/images/user/${user?.photo}`} className="img-fluid img-thumbnail img" alt="default"></img> : null
                }
                <h3 className="username">{user?.username}</h3>
            </div>
            <div>
                <Link to = {`${match.url}/resetpassword`}>Change Password</Link>
            </div>

            <div className="container">
                <div className="row">
                <form className="col-6" onSubmit = {handlePhotoSubmit} encType = "multipart/form-data">
                    <Form name = "updatephoto" type="file" className="form-control" id="photo" handleChange = {handlePhotoChange} label="Update Profile Photo"/>
                    <button className = "btn btn-primary btn-sm" type = "submit" disabled = {file === null}>Update Profile</button>
                </form>


                <form  className = "col-6 w-50"onSubmit = {handleDetailSubmit} encType = "multipart/form-data">
                    {
                        user ?
                            <Form name = "updateemail" type="email" className="form-control" id="email" handleChange = {handleEmailChange} placeholder = {value} label="Update Email"/>
                        :
                            null
                    }
                    <button className = "btn btn-primary btn-sm" type = "submit" disabled = {email === '' ? true:false}>Update</button>
                </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: getUserSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    updatePhoto: (data) => dispatch(updatePhoto(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);