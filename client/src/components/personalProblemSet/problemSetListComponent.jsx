import React from 'react'

export default function ProblemSetListComponent({playlist}) {
    console.log(playlist);

    return (
        <div>
            <h5>{playlist.name}</h5 >
            {
                playlist?.list?.map(el =>(
                    <h6 key = {el._id}>{el.title}</h6>
                ))
            }
        </div>
    )
};
