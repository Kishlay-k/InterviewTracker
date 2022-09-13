import React from 'react';

import './form.scss';

function Form({type,id,placeholder,handleChange,label,value,required,name}) {
    return (
        <div className = "form-group custom1">

            {
                label ?  <label id = {id}>{label}</label> : null
            }

            <input name = {name} type={type} value = {value} className="form-control" id={id} placeholder={placeholder} onChange = {handleChange} required = {required}></input>
            
        </div>
    )
}

export default Form;
