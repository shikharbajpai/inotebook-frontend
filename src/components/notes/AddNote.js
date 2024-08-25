import React, { useContext, useState } from 'react';
import NoteContext from '../../context/notes/noteContext';

export const AddNote = ({ setAlert }) => {
    const { addNote } = useContext(NoteContext);

    // Initial state for the form
    const initialState = {
        title: "",
        description: "",
        tag: ""
    };

    // State to manage form data and loading state
    const [addedNote, setAddedNote] = useState(initialState);
    const [loading, setLoading] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            // Add the note using the addNote function from context
            await addNote(addedNote.title, addedNote.description, addedNote.tag);

            // Set the success alert type and message to be displayed
            setAlert({ type: 'success', message: 'Note added successfully!' });

            // Clear the form after adding the note
            setAddedNote(initialState);
        } catch (error) {
            // Handle different types of errors
            if (error.response && error.response.status === 500) {
                setAlert({ type: 'danger', message: 'Server error. Please try again later.', autoClose: false });
            } else {
                setAlert({ type: 'danger', message: 'Failed to add note. Please try again.', autoClose: false });
            }
        } finally {
            setLoading(false); // End loading
        }
    };

    // Handle input changes
    const onChange = (e) => {
        setAddedNote({ ...addedNote, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h1 className="text-primary">Add a Note</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={addedNote.title}
                        onChange={onChange}
                        aria-describedby="title"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        placeholder="Enter description"
                        id="description"
                        name="description"
                        value={addedNote.description}
                        onChange={onChange}
                        style={{ height: '200px' }}
                        rows="3"
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={addedNote.tag}
                        onChange={onChange}
                        aria-describedby="tag"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {loading ? 'Adding...' : 'Add Note'}
                </button>
            </form>
        </>
    );
};
