import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Note from './Note';
import Footer from './Footer';
import CreateArea from './CreateArea';
import Login from './Login';
import Register from './Register';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

const App = () => {

    const [login, setLogin] = useState(false);
    const [notes, setNotes] = useState([]);
    const [register, setRegister] = useState(true);
    const [username, setUsername] = useState('');
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        axios.get('/loggedin')//change to http://localhost:3000/ in dev
            .then((response) => {
                if (response.data.cookies) {
                    setLogin(true);
                    setNotes(response.data.user.notes);
                    setUsername(response.data.user.username);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const addNote = note => {
        setNotes(prev => [...prev, note]);
    };

    const deleteNote = id => {
        setNotes(prev => prev.filter(note => note.id !== id));
        axios.post('/note/delete', { id })
            .then(response => console.log(response.data))
            .catch(err => console.log(err));
    };

    const renderNotes = note => {
        return (
            <Note key={note.id} id={note.id} deleteNote={deleteNote} title={note.title} content={note.content} />
        );
    };

    const loginSubmit = e => {
        e.preventDefault();
        const user = {
            username: e.target[0].value,
            password: e.target[1].value
        }
        axios.post('/auth/login', user)
            .then((response) => {
                if (response.data.authenticated) {
                    setLogin(true);
                    setNotes(response.data.user.notes);
                    setUsername(response.data.user.username);
                    setErrorText('');
                } else {
                    setErrorText(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const registerSubmit = e => {
        e.preventDefault();
        e.persist()
        const user = {
            username: e.target[0].value,
            password: e.target[1].value
        }
        axios.post('/auth/register', user)
            .then((response) => {
                if (response.data.authenticated) {
                    setLogin(true);
                    setUsername(response.data.user.username);
                    setErrorText('');
                } else {
                    setErrorText(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleLogout = () => {
        axios.get('/auth/logout')
            .then(() => {
                setLogin(false);
                setNotes([]);
                setUsername('');
            })
            .catch(err => console.log(err))
    };

    const toggleRegister = () => {
        setRegister(!register);
    };

    const checkLogin = () => {//render login form if not logged in
        if (login) {
            return (
                <div>
                    <CreateArea addNote={addNote} />
                    {notes.map(renderNotes)}
                </div>
            );
        } else if (register && !login) {
            return <Register handleRegister={registerSubmit} toggleRegister={toggleRegister} />
        } else {
            return <Login handleSubmit={loginSubmit} toggleRegister={toggleRegister} />
        }
    };

    return (
        <div>
            <Header username={username} handleLogout={handleLogout} loggedIn={login} />
            {checkLogin()}
            <div className='loginError'>{errorText}</div>
            <Footer />
        </div>
    );
};

export default App;