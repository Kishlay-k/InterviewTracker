import React,{useEffect} from 'react';
import WithSpinner from '../../components/withSpinner/withSpinner';
import {useParams} from 'react-router-dom';
import {fetchObject} from '../../redux/object/objectAction';
import {connect} from 'react-redux';
import {isLoading} from '../../redux/object/objectSelector';
import UserSearchComponent from './userSearchComponent';

const UserWithSpinner = WithSpinner(UserSearchComponent);

function UserSearch({fetchObject,isLoading}) {

    const {username} = useParams();

    useEffect(()=>{
        fetchObject(username);
    },[fetchObject,username]);

    return (
        <div>
            <UserWithSpinner isLoading={!isLoading}/> 
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    fetchObject: (username) => dispatch(fetchObject(username))
});

const mapStateToProps = (state) => ({
    isLoading: isLoading(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
