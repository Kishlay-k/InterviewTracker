import React from 'react';
import {deleteListItem} from '../../api/index';
import {addAList} from '../../redux/user/userActions';
import {connect} from 'react-redux';

function ListItem({el, sid, addAList}) {

    const handleDeleteEle = async(el) => {
        try {
            const data = {sid: sid};
            console.log(data);
            const res = await deleteListItem(el._id, data);
            console.log(res);
            addAList(res.data.problemsets);
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    return (
        <div>
            <li className="list-group-item d-flex justify-content-between align-items-center pt-1 pb-1">
                <a href = {el.link} target = "_blank" rel="noreferrer" style = {{textDecoration:'none'}}>{el.title}</a>
                <span onClick={e => handleDeleteEle(el)}>x</span>
            </li>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    addAList: (data) => dispatch(addAList(data)),
});

export default connect(null, mapDispatchToProps)(ListItem);