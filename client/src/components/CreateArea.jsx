import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const CreateArea = props => {

    const [note, setNote] = useState({
        id: '',
        title: '',
        content: ''
    });

    const [focus, setFocus] = useState(false)

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

            axios.post('/note', noteWithId)
                .then(response => console.log(response))
                .catch(err => console.log(err))

            props.addNote(noteWithId);
            setNote(() => ({
                id: '',
                title: '',
                content: ''
            }));
            setFocus(() => false)
        }
    }

    const onFocus = () => {
        setFocus(() => true);
    }

    return (
        <div>
            <form className='create-note' onSubmit={e => submitNote(e)} >
                {focus && <input name='title' placeholder='Title' onChange={handleChange} value={note.title} />}
                <textarea name='content' placeholder='Take a note...' rows={focus ? 3 : 1} onChange={handleChange} onFocus={onFocus} value={note.content} />
                <Zoom in={focus} timeout={250}>
                    <Fab className='submitButton' color="primary" aria-label="add" type="submit">
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;