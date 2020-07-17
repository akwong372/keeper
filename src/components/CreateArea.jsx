import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CreateArea = props => {

    const [note, setNote] = useState({
        id: '',
        title: '',
        content: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        const newNote = {
            [name]: value
        }
        setNote(prev => ({ ...prev, ...newNote }));
    };

    const submitNote = e => {
        e.preventDefault();
        if (note.title.trim() && note.content.trim()) {
            const noteWithId = {
                ...note,
                id: uuidv4()
            };
            props.addNote(noteWithId);
            setNote(() => ({
                id: '',
                title: '',
                content: ''
            }));
        }
    }

    return (
        <div>
            <form onSubmit={e => submitNote(e)}>
                <input name='title' placeholder='Title' onChange={handleChange} value={note.title} />
                <textarea name='content' placeholder='Take a note...' rows='3' onChange={handleChange} value={note.content} />
                <button>Add</button>
            </form>
        </div>
    );
}

export default CreateArea;