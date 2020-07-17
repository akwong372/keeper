import React, {useState} from 'react';
import Header from './Header';
import Note from './Note';
import Footer from './Footer';
import CreateArea from "./CreateArea";
import { v4 as uuidv4 } from 'uuid';

const App = () => {

    const [notes, setNotes] = useState([]);

    const addNote = note => {
        const title = note[0].value;
        const content = note[1].value;
        const newNote = {
            id: uuidv4(),
            title: title,
            content: content
        };
        return setNotes(prev => [...prev, newNote]);
    };

    const deleteNote = id => {
        console.log(id)
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