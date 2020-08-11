import React from 'react';
import InputBox from './InputBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Login = props => {
    return (
        <div>
            <form action='/login' method='POST' className="create-note" onSubmit={e => props.handleSubmit(e)}>
                <InputBox labelFor='username' labelText='Username' type='username' placeholder='username here' />
                <InputBox labelFor='password' labelText='Password' type='password' placeholder='password here' />
                <button className='submitButton'>Login</button>
            </form>
            <button className='loginButtons' onClick={props.toggleRegister}>Register New</button>
            <div>
                <button className='loginButtons'>
                    <a href="http://localhost:8080/auth/google">
                        <FontAwesomeIcon className='googleIcon' icon={['fab', 'google']} />
                        Sign In With Google
                </a>
                </button>
            </div>
        </div>
    )
};

export default Login;