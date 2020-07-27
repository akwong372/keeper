import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Note from './Note';
import Footer from './Footer';
import CreateArea from './CreateArea';
import Login from './Login';
import Register from './Register';

const App = () => {

    const [notes, setNotes] = useState([]);
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(true);

    const addNote = note => {
        return setNotes(prev => [...prev, note]);
    };

    const deleteNote = id => {
        setNotes(prev => prev.filter(note => note.id !== id));
    }

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
        axios.post('/login', user)
            .then((response) => {
                console.log(response.data);
                setLogin(true)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const registerSubmit = e => {
        e.preventDefault();
        const user = {
            username: e.target[0].value,
            email:e.target[1].value,
            password: e.target[2].value
        }
        axios.post('/register', user)
            .then((response) => {
                console.log(response.data);
                setLogin(true)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const checkLogin = () => {//render login form is not logged in
        if (login) {
            return (
                <div>
                    <CreateArea addNote={addNote} />
                    {notes.map(renderNotes)}
                </div>
            );
        } else if (register && !login){
            return <Register handleRegister={registerSubmit} />
        } else {
            return <Login handleSubmit={loginSubmit} />
        }

    }

    return (
        <div>
            <Header />
            {checkLogin()}
            <Footer />
        </div>
    );
};

export default App;