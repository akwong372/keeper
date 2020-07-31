import React from 'react';
import InputBox from './InputBox';

const Login = props => {
    return (
        <div>
            <form action='/login' method='POST' className="create-note" onSubmit={e => props.handleSubmit(e)}>
                <InputBox labelFor='username' labelText='Username' type='username' placeholder='username here' />
                <InputBox labelFor='password' labelText='Password' type='password' placeholder='password here' />
                <button>Login</button>
            </form>
            <button onClick={props.toggleRegister}>Register New</button>
            <div>
                <a href="/auth/google" role="button">Sign In with Google</a>
            </div>
        </div>
    )
};

export default Login;