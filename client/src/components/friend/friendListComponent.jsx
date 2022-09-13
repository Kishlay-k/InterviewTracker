import React from 'react';
import {getUserSelector} from '../../redux/user/userSelector';
import {connect} from 'react-redux';
import FriendComponent from './friendComponent';
import FriendRequestComponent from './friendRequestComponent';

function FriendListComponent({user}) {
    return (
        <div className = "justify-content-around d-flex">
            <div className="mr-2 ml-2 w-25">
                <h6>My friends</h6>
                <ol className="list-group">
                    {
                        user?.friends.map(e => 
                            <FriendComponent key = {e._id} object = {e} />
                        )
                    }
                </ol>
            </div>

            <div className="mr-2 ml-2 w-25">
                <h6>Friend Requests</h6>
                <ol className="list-group">
                    {
                        user?.friendRequests.map(e => 
                            <FriendRequestComponent key = {e._id} object = {e} />
                        )
                    }
                </ol>
            </div>
        </div>
    )
};

const mapStateToProps = (state) =>({
    user : getUserSelector(state),
});

export default connect(mapStateToProps)(FriendListComponent);
