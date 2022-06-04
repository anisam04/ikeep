import react, { useState } from "react"
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)


  //-------------------Get all Notes---------------------
  const getAllNotes = async () => {
    const url = `${host}/api/notes/getallnotes`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }
  //---------------Add a Note-------------------------------
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    const note = await response.json()
    setNotes(notes.concat(note))
    // console.log("Success!")

  }

  //------------------------delete a note---------------------
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json = response.json()
    console.log(json)
    console.log("Deleting" + id + "this note")
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }
  //--------------------------edit a note----------------
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(title, description, tag)
    })
    const json = response.json()
  }

  return (
    <noteContext.Provider value={{ notes, setNotes, getAllNotes, deleteNote, addNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;
