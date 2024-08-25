import React, { useState, useContext } from 'react';
import NoteContext from '../../context/notes/noteContext';
import { DeleteModal } from '../notes/DeleteModal';
import EditNoteModal from '../notes/EditNoteModal';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Using icons from react-icons

export const NoteItem = (props) => {
  const { note, setAlert } = props;
  const noteContext = useContext(NoteContext);
  const { deleteNote, editNote } = noteContext;

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteShow = () => setShowDeleteModal(true);
  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      await deleteNote(note._id);
      setAlert({ type: 'success', message: 'Note deleted successfully!', autoClose: true });
      handleDeleteClose();
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to delete note. Please try again later.' });
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await editNote(note._id, formData.title, formData.description, formData.tag);
      setAlert({ type: 'success', message: 'Note updated successfully!', autoClose: true });
      handleClose();
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to update note. Please try again later.' });
    }
  };

  return (
    <>
      <div className="col-md-4 my-3">
        <div className="card note-card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <div className="note-card-footer">
              <button className="btn btn-link text-primary" onClick={handleShow}>
                <FaEdit /> Edit
              </button>
              <button className="btn btn-link text-danger" onClick={handleDeleteShow}>
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal show={showDeleteModal} handleClose={handleDeleteClose} handleDelete={handleDelete} />
      <EditNoteModal show={showModal} handleClose={handleClose} noteData={{ title: note.title, description: note.description, tag: note.tag }} handleUpdate={handleUpdate} />
    </>
  );
};
