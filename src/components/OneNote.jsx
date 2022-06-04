import React, { useContext } from 'react'
import noteContext from "./context/noteContext";


export const OneNote = (props) => {
    const context = useContext(noteContext)
    const {deleteNote} = context;
    const { note } = props;

    return (
        <div>
            {/* {note.title}
            {note.description} */}
            <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">{note.tag}</p>
                        <button type="button" className="btn btn-primary">Edit</button>
                        <button type="button" className="btn btn-primary" onClick={()=>{deleteNote(note._id)}}>Delete</button>

                        {/* <a href="#" className = "btn btn-primary">Edit</a>
                        <a href="#" className = "btn btn-primary" onClick={()=>{deleteNote(note._id)}}>Delete</a> */}
                    </div>
            </div>
        </div>
    );
}

