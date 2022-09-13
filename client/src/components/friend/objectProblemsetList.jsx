import React,{useState} from 'react';
import ObjectProblemsetListItem from './objectProblemsetListItem';

export default function ObjectProblemsetList({list}) {

    const [show , setShow]  = useState(false);
    
    return (
        <div>
            <li className="list-group-item d-flex justify-content-between align-items-center" style = {{cursor: 'pointer'}} onClick={(e) => setShow(state => !state)}>
                {list.name}
            </li>
        {
            show ? <ObjectProblemsetListItem key = {list._id} list = {list.list} /> : null
        }
        </div>
    )
}
