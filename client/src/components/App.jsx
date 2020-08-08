import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        axios.get('http://localhost:3000/loggedin')
            .then((response) => {
                if (response.data.cookies) {
                    setLogin(true);
                    setNotes(response.data.user.notes)
                }
                console.log(response);
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
        axios.post('/deletenote', { id })
            .then(response => console.log(response))
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
        axios.post('/login', user)
            .then((response) => {
                console.log(response.data);
                setLogin(true)
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
            password: e.target[1].value,
            email: e.target[2].value
        }
        axios.post('/register', user)
            .then((response) => {
                console.log(response.data);
                setLogin(true)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleLogout = () => {
        axios.get('/logout')
            .then(() => setLogin(false))
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
            <Header handleLogout={handleLogout} />
            {checkLogin()}
            <Footer />
        </div>
    );
};

export default App;