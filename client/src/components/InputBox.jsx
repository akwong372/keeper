import React from 'react';

const InputBox = props => {
    return (
        <div>
        <label htmlFor={props.labelFor}>{props.labelText}</label>
        <input id={props.type} name={props.type} type={props.type} placeholder={props.placeholder}/>
    </div>
    );
}

export default InputBox;