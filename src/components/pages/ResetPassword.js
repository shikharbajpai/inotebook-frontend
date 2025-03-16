import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Spinner from '../common/Spinner';
import Alert from '../common/Alert';
import './AuthForm.css';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const [alert, setAlert] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { resetToken, setResetToken, resetPassword, error } = useContext(AuthContext);

    useEffect(() => {
        if (!resetToken) {
            setAlert({ type: 'danger', message: 'No reset resetToken provided' });
            navigate('/login');
        }
    }, [resetToken, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        setAlert(null);
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            setFormError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            if (!resetToken) {
                throw new Error('Reset resetToken is missing');
            }
            const success = await resetPassword(resetToken, newPassword);
            if (success) {
                setAlert({ type: 'success', message: 'Password reset successfully' });
                setNewPassword('');
                setConfirmPassword('');
                setResetToken('');
                navigate('/login');
            } else {
                setAlert({ type: 'danger', message: error || 'User not found' });
            }
        } catch (error) {
            setFormError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="auth-form-container">
            <h2 className="text-center mb-4">Reset Password</h2>
            {alert && <Alert type={alert.type} message={alert.message} />}
            {isLoading ? (
                <Spinner />
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`form-control ${formError && 'is-invalid'}`}
                                id="newPassword"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter your new password"
                                aria-describedby="newPasswordError"
                            />
                            <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {formError && <div id="newPasswordError" className="invalid-feedback">{formError}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${formError && 'is-invalid'}`}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your new password"
                            aria-describedby="confirmPasswordError"
                        />
                        {formError && <div id="confirmPasswordError" className="invalid-feedback">{formError}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                </form>
            )}
        </div>
    );
};

export default ResetPassword;
