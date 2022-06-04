import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import noteContext from "./context/noteContext"

export const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleSubmit = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: ""})

    }
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })

    }
    return (
        <div>
            <div className='container'>
                {/* <h1>This is my ikeep App</h1> */}
                <br /> <br />
                <h1>Add Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                    </div>
                    {/* <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button> */}
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>

                </form>
            </div>
            <br />
        </div>
    );
}

