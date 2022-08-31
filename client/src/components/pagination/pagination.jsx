import React from 'react';
import {Link} from 'react-router-dom';

export default function Pagination({items,paginate,page}) {
    const pagenumbers = [];

    for(let i = 1; i <= Math.ceil(items); i++){
        pagenumbers.push(i);
    }
    return (
        <nav>
            <ul className = "pagination pagination-sm">
                {pagenumbers.map(number=> (
                    <li key = {number} className = {`page-item ${page === number ? 'active' : ''}`}>
                        <Link to = '/' onClick = {()=> paginate(number)} className = 'page-link' >{number}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
