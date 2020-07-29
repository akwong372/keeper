import React from 'react';
import InputBox from './InputBox';

const Register = props => {
    return (
        <div>
            <form action='/register' method='POST' className="create-note" onSubmit={e => props.handleRegister(e)}>
                <InputBox labelFor='username' labelText='Username' type='username' placeholder='username here' />
                <InputBox labelFor='password' labelText='Password' type='password' placeholder='password here' />
                <InputBox labelFor='email' labelText='Email' type='email' placeholder='email here' />
                <button>Register</button>
            </form>
            <button onClick={props.toggleRegister}>Login Existing</button>
        </div>

    )
};

export default Register;