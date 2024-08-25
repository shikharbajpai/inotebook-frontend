import React from 'react'

export const DeleteModal = ({ show, handleClose, handleDelete }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        handleDelete();
    };
    return (
        <>
            <div className={`modal fade ${show ? 'show d-block' : ''}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this note ?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>No</button>
                            <button type="button" className="btn btn-primary" onClick={onSubmit}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
