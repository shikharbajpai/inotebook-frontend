import { useState, useContext } from "react";
import config from '../../config/config';
import NoteContext from "./noteContext";
import AuthContext from "../auth/authContext";

const NoteState = (props) => {
  const baseURL = config.API_BASE_URL || '';
  const { token } = useContext(AuthContext); // Use context to get token

  const [notes, setNotes] = useState([]);

  // Fetch all notes
  const getAllNotes = async () => {
    const url = `${baseURL}/api/notes/fetchallnotes`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token // Use the token from context
        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      const notes = json.data.records.notes;
      setNotes(notes);

      // Return the notes array to check for length in the component
      return notes;
    } catch (error) {
      // console.error(error.message);
      return null; // Return null to indicate failure
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const url = `${baseURL}/api/notes/addnote`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({ title, description, tag })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      const note = json.data.records.notes; // Note: Ensure this matches the actual response structure
      setNotes(notes.concat(note));
    } catch (error) {
      console.error(error.message);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    const url = `${baseURL}/api/notes/deletenote/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const url = `${baseURL}/api/notes/updatenote/${id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({ title, description, tag })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const editNotes = notes.map(note =>
        note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(editNotes);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, getAllNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
