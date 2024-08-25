import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const SessionExpired = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { setToken } = authContext;
  const handleClick = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Session Expired</h3>
            </div>
            <div className="modal-body">
              <p>Session expired. Please log in again.</p>
            </div>
            <div className="modal-footer d-flex justify-content-center align-items-center">
              <button type="button" className="btn btn-primary" onClick={handleClick}>Ok</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SessionExpired;
