import React, { useState } from 'react';
import Header from './Header';
import Note from './Note';
import Footer from './Footer';
import CreateArea from './CreateArea';
import Login from './Login';

const App = () => {

    const [notes, setNotes] = useState([]);
    const [login, setLogin] = useState(false);

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

    const loginSubmit = e =>{
        e.preventDefault();
        console.log(e.target[0].value)
    }

    const checkLogin = () => {
        if (login) {
            return (
                <div>
                    <CreateArea addNote={addNote} />
                    {notes.map(renderNotes)}
                </div>
            );
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