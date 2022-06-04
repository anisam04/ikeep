import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from "./context/noteContext"
import { OneNote } from './OneNote'
import { AddNote } from './AddNote'
import { useNavigate } from 'react-router-dom'


export const Notes = () => {
    const context = useContext(noteContext);
    let history = useNavigate()
    const { notes, getAllNotes } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
        getAllNotes()
    } else {
        history("/login")

    }
        //eslint-disable-next-line
    }, [])
    return (
        <div>
            <AddNote />
            <h1>My Notes</h1>
            <div className="row mx-auto">
                {notes.length===0 && 'No notes added yet'}
                {notes.map((note) => {
                    return <OneNote key={note._id} note={note} />
                })}
            </div>
        </div>
    );
}

