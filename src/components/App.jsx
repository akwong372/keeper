import React from 'react';
import Header from './Header';
import Note from './Note';
import Footer from './Footer';
import notes from '../notes';

const renderNotes = (note, i) => {
    return (
        <Note key={'note'+i} title={note.title} content={note.content} />
    );
};

const App = () => {

    return (
        <div>
            <Header />
            {notes.map(renderNotes)}
            <Footer />
        </div>
    );
};

export default App;