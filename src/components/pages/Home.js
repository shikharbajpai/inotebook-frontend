import React, { useContext } from 'react';
import { Notes } from '../notes/Notes';
import { AddNote } from '../notes/AddNote';
import AuthContext from '../../context/auth/authContext';
import NoteContext from '../../context/notes/noteContext';

export const Home = (props) => {
  const { setAlert } = props;
  const authContext = useContext(AuthContext);
  const noteContext = useContext(NoteContext);
  const { token } = authContext;
  const { notes } = noteContext;

  return (
    <div className='container my-3'>
      {token && notes !== null && <AddNote setAlert={setAlert} />}
      <Notes setAlert={setAlert} />
    </div>
  );
}
