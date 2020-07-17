import React from 'react';

const CreateArea = props => {
  return (
    <div>
      <form onSubmit={e=>{e.preventDefault(); props.addNote(e.target)}}>
        <input name='title' placeholder='Title' />
        <textarea name='content' placeholder='Take a note...' rows='3' />
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;