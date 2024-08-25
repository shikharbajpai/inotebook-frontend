import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../../context/notes/noteContext';
import { NoteItem } from './NoteItem';
import { FaRegStickyNote, FaPlusCircle } from 'react-icons/fa';
import Spinner from '../common/Spinner';
import AuthContext from '../../context/auth/authContext';
import SessionExpired from '../common/SessionExpired';

export const Notes = (props) => {
    const noteContext = useContext(NoteContext);
    const { notes, setNotes, getAllNotes } = noteContext;
    const authContext = useContext(AuthContext);
    const { token } = authContext;
    const { setAlert } = props;

    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [isSessionExpired, setIsSessionExpired] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            setNotes([]);
            if (!token) {
                setAlert({ type: 'danger', message: 'You must be logged in to view notes.', autoClose: false });
                return;
            }
            try {
                setLoading(true);
                const fetchedNotes = await getAllNotes();
                if (!fetchedNotes) {
                    setIsSessionExpired(true); // Trigger session expired modal
                } else if (fetchedNotes.status === 'success') {
                    if (fetchedNotes?.data?.records?.notes?.length === 0) {
                        setAlert({ type: 'info', message: 'No notes available. Start by adding a new note.' });
                    } else {
                        setFilteredNotes(fetchedNotes.data.records.notes);
                    }
                }
            } catch (error) {
                setAlert({ type: 'danger', message: 'Failed to fetch notes. Please try again later.' });
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        const results = notes.filter(note =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNotes(results);
    }, [searchQuery, notes]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            {isSessionExpired && <SessionExpired />}
            <div className="row container my-3">
                {token && (
                    <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap">
                        <h1 className="text-primary mb-0">My Notes</h1>
                        <div className="d-flex align-items-center">
                            <form className="d-flex me-2" role="search" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search by title"
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    style={{ minWidth: '200px' }}
                                />
                            </form>
                            <button className="btn btn-outline-primary" onClick={() => window.scrollTo(0, 0)}>
                                <FaPlusCircle /> Create New Note
                            </button>
                        </div>
                    </div>
                )}
                {loading ? (
                    <div className="text-center">
                        <Spinner />
                        <p className="mt-3">Loading your notes, please wait...</p>
                    </div>
                ) : filteredNotes.length === 0 ? (
                    <div className="no-notes-container text-center">
                        <FaRegStickyNote className="no-notes-icon" />
                        <h2 className="mb-2">No Notes Available</h2>
                        {token ? (
                            <>
                                <p className="text-muted">It seems you haven't created any notes yet.</p>
                                <button className="btn btn-primary mt-3" onClick={() => window.scrollTo(0, 0)}>
                                    <FaPlusCircle /> Create Your First Note
                                </button>
                            </>
                        ) : (
                            <p className="text-muted">Please log in to start creating notes.</p>
                        )}
                    </div>
                ) : (
                    filteredNotes.map((note) => (
                        <NoteItem note={note} key={note._id} setAlert={setAlert} />
                    ))
                )}
            </div>
        </>
    );
};
