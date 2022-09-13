/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {deleteList} from '../../api/index';
import {addAList} from '../../redux/user/userActions';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'


function ProblemSetItem({el, func, addAList}) {

    const [deletelist, setdeletelist] = useState(false);
    const history = useHistory();
    
    const handleDeleteItem = async (el) => {
        try {
            const res = await deleteList(el._id);
            setdeletelist(e => !e);
            addAList(res.data.problemsets);
            history.push('/list?name=Favorite');
        } catch (err) {
            alert(err.response.data.message);
        }
    }
    return (
        <div>
            <li className="list-group-item d-flex justify-content-between align-items-center" style = {{cursor: 'pointer'}} onClick={(f) => func(el.name)}>
                {el.name}
                {
                    el.name === 'Favorite' ? null : <button type="button" className="close" aria-label="Close"><span aria-hidden="true" onClick={e => handleDeleteItem(el)}>x</span></button>
                }
            </li>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    addAList: (data) => dispatch(addAList(data)),
});

export default connect(null, mapDispatchToProps)(ProblemSetItem);