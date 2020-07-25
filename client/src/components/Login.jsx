import React from 'react';

const Login = props => {
    return (
        <form action='/login' method='POST' className="create-note" onSubmit={e=>props.handleSubmit(e)}>
            <div>
                <label htmlFor='username'>Username</label>
                <input id='username' name='username' type='username' placeholder='username here'/>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input id='password' name='password' type='password' placeholder='password here'/>
            </div>
            <button/>
        </form>
    )
};

export default Login;