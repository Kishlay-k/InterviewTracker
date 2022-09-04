import React from 'react';
import Form from '../form/formComponent';
export default function CreateProblemset({handleChange,handleSubmit,name}) {

   
    
    
    return (
        <div className = "container pt-3 pb-3">
            <form onSubmit={handleSubmit} className = "mt-3">
                <Form name = "name" value = {name} required = {true} id = "#name" placeholder = {"Enter name of your new list"} handleChange = {handleChange}/>
                <input type = "submit" value = "Create" className = "btn btn-primary btn-sm"/>
            </form>
        </div>
    )
}
