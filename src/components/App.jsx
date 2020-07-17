import React, {useState} from 'react';
import Header from './Header';
import Note from './Note';
import Footer from './Footer';
import CreateArea from "./CreateArea";

const App = () => {

    const [notes, setNotes] = useState([]);

    const addNote = note => {
        return setNotes(prev => [...prev, note]);
    }

    const renderNotes = (note, i) => {
        return (
            <Note key={'note' + i} title={note.title} content={note.content} />
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