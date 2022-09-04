import React from 'react';
import Form from '../form/formComponent';

const NewListItemForm = ({handleChange,handleSubmit,title,link,topic}) =>{
    return(
        <div>     
            <div className = "container pt-3 pb-3">
                <form onSubmit = {handleSubmit} className = "mt-3">
                    <Form name = "title" type = "text" value = {title} className="form-control" id="#title" handleChange = {handleChange} required = {true} placeholder = "Name of the question" />
                    <Form name = "link" type = "text" value = {link} className="form-control" id="#link" handleChange = {handleChange} required = {true} placeholder = "Link"/>
                    <Form name = "topic" type = "text" value = {topic} className="form-control" id="#topic" handleChange = {handleChange} required = {false} placeholder = "Topic"/>
                    <input type = "submit" className="btn btn-primary" id = "#btn" value = "Submit"/>
                </form>
            </div>         
        </div>

    );
};

export default NewListItemForm;