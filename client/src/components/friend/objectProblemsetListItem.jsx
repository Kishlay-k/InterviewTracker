import React from 'react';

export default function ObjectProblemsetListItem({list}) {
    
    return (  
        <div>
            {
                list.map(item => 
                    <a  key = {item._id} href={item.link} target = "_blank" rel="noreferrer"><li className="list-group-item d-flex justify-content-between align-items-center" style = {{cursor: 'pointer'}}>
                        {item.title}
                    </li>
                    </a>
                )  
            } 
        </div> 
    )
}
