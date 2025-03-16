import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import Spinner from '../common/Spinner';
import Alert from '../common/Alert';
import './AuthForm.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState(''); // Initialize email as an empty string
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const [alert, setAlert] = useState(null);
    const { sendResetToken, error } = useContext(AuthContext);
    const navigate = useNavigate();

    const onChange = (e) => {
        setEmail(e.target.value); // Directly update email value
    };

    const validateForm = () => {
        setFormError(null); // Initialize formError as null
        const newErrors = {};

        const trimmedEmail = email.trim();

        // Email validation
        if (!trimmedEmail) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setFormError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        setIsLoading(true);

        if (validateForm()) {
            try {
                const success = await sendResetToken(email); // Send email directly
                if (success) {
                    setAlert({ type: 'success', message: 'Reset token sent to your email!' });
                    setEmail(''); // Clear email input
                    navigate('/resetPassword');
                } else {
                    setAlert({ type: 'danger', message: error || 'User not found' });
                }
            } catch (error) {
                setAlert({ type: 'danger', message: error.message });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="auth-form-container">
            <h2 className="text-center mb-4">Forgot Password</h2>
            {alert && <Alert type={alert.type} message={alert.message} />}
            {isLoading ? (
                <Spinner />
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <div className="input-group">
                            <input
                                type="email"
                                className={`form-control ${formError?.email && 'is-invalid'}`}
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Enter your email"
                                aria-describedby="emailError"
                            />
                            <span className="input-group-text"><FaEnvelope /></span>
                        </div>
                        {formError?.email && <div id="emailError" className="invalid-feedback">{formError.email}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Send Reset Token</button>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;
