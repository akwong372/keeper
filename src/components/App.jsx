import React, { useState } from 'react';
import Header from './Header';
import Note from './Note';
import Footer from './Footer';
import CreateArea from "./CreateArea";

const App = () => {

    const [notes, setNotes] = useState([]);

    const addNote = note => {
        // const [title, content]
        // const title = note[0].value;
        // const content = note[1].value;
        // const newNote = {
        //     id: uuidv4(),
        //     title: title,
        //     content: content
        // };
        return setNotes(prev => [...prev, note]);
    };

    const deleteNote = id => {
        setNotes(prev => prev.filter(note => note.id !== id));
    }

    const renderNotes = (note) => {
        return (
            <Note key={note.id} id={note.id} deleteNote={deleteNote} title={note.title} content={note.content} />
        );
    };

    return (
        <div>
            <Header />
            <CreateArea addNote={addNote} />
            {notes.map(renderNotes)}
            <Footer />
        </div>
    );
};

export default App;