import React from 'react';
import InputBox from './InputBox';

const Register = props => {
    return (
        <div>
            <form action='/register' method='POST' className="create-note" onSubmit={e => props.handleRegister(e)}>
                <InputBox labelFor='username' labelText='Username' type='username' placeholder='username here' />
                <InputBox labelFor='password' labelText='Password' type='password' placeholder='password here' />
                <button>Register</button>
            </form>
            <button className='loginButtons' onClick={props.toggleRegister}>Login Existing</button>
        </div>

    )
};

export default Register;