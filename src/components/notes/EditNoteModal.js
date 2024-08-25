import React, { useState, useEffect } from 'react';

const EditNoteModal = ({ show, handleClose, noteData, handleUpdate }) => {
  const [formData, setFormData] = useState(noteData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (noteData) {
      setFormData(noteData);
    }
  }, [noteData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.tag.trim()) newErrors.tag = 'Tag is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleUpdate(formData);
    }
  };

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden={!show}>
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit} noValidate>
              <div className="form-group mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter description"
                />
                {errors.description && <div className="invalid-feedback">{errors.description}
                  </div>}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input
                  type="text"
                  className={`form-control ${errors.tag ? 'is-invalid' : ''}`}
                  id="tag"
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  placeholder="Enter tag"
                />
                {errors.tag && <div className="invalid-feedback">{errors.tag}</div>}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button type="submit" className="btn btn-primary" onClick={onSubmit}>Update Note</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
