import { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

function AddNote(props) {
  const context = useContext(NoteContext);
    // eslint-disable-next-line
  const {notes, addNote} = context;

  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const handleClick = (e) =>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
    props.showAlert("Note Added successfully", "success")
  }

  const onChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div className="container my-3">
      <div className="card shadow p-4">
      <h2>Add a new note</h2>
      <form>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} placeholder='Enter a title' onChange={onChange} minLength={3} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} placeholder='Enter description' onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} placeholder='Enter tag' onChange={onChange}/>
        </div>
        <button type="submit" disabled={note.title.length<3 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
      </div>
    </div>

  )
}

export default AddNote
