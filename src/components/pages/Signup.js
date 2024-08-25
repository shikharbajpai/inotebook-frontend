import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InstructionPanel from '../common/InstructionPanel';

export const Signup = (props) => {
    const { setAlert, clearAlert } = props;
    const authContext = useContext(AuthContext);
    const { register, error, setError, token, setToken } = authContext;

    const navigate = useNavigate();

    const initialState = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const [signupCreds, setSignupCreds] = useState(initialState);
    const [formError, setFormError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        clearAlert();
        setError(null);
        if (token) {
            setToken('');
            localStorage.removeItem('token');
        }
    }, [clearAlert, setError, token, setToken]);

    const onChange = (e) => {
        setSignupCreds({ ...signupCreds, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        const { name, email, password, confirmPassword } = signupCreds;

        // Trim the name and email to remove leading and trailing spaces
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        signupCreds.name = trimmedName;
        signupCreds.email = trimmedEmail;

        // Name validation: no empty name, numbers, or special characters
        if (!trimmedName) {
            newErrors.name = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
            newErrors.name = 'Name can only contain letters and spaces';
        } else if (trimmedName.length < 3) {
            newErrors.name = 'Name must be at least 3 characters long';
        }

        // Email validation
        if (!trimmedEmail) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        } else if (/\.\w{2,4}\.\w{2,4}$/.test(email)) { // Checks for ".com.con" etc.
            newErrors.email = 'Please check your email domain';
        }

        // Password validation: strength and no spaces allowed
        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (/\s/.test(password)) {
            newErrors.password = 'Password should not contain spaces';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[a-z]/.test(password)) {
            newErrors.password = 'Password must contain at least one lowercase letter';
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = 'Password must contain at least one digit';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            newErrors.password = 'Password must contain at least one special character';
        }

        // Confirm password validation
        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setFormError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormError({});
        setIsSubmitting(true);

        if (validateForm()) {
            const success = await register(signupCreds.name, signupCreds.email, signupCreds.password);
            if (success) {
                setAlert({ type: 'success', message: 'Registered successfully' });
                setSignupCreds(initialState);
                navigate('/');
            } else {
                setAlert({ type: 'danger', message: error || 'Signup failed. Please try again.' });
            }
        }

        setIsSubmitting(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signup-container d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Sign Up</h2>
                <InstructionPanel />
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className={`form-control ${formError.name && 'is-invalid'}`}
                            id="name"
                            name="name"
                            value={signupCreds.name}
                            onChange={onChange}
                            placeholder="Enter your name"
                            aria-describedby="nameError"
                        />
                        {formError.name && <div id="nameError" className="invalid-feedback">{formError.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className={`form-control ${formError.email && 'is-invalid'}`}
                            id="email"
                            name="email"
                            value={signupCreds.email}
                            onChange={onChange}
                            placeholder="Enter your email"
                            aria-describedby="emailError"
                        />
                        {formError.email && <div id="emailError" className="invalid-feedback">{formError.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`form-control ${formError.password && 'is-invalid'}`}
                                id="password"
                                name="password"
                                value={signupCreds.password}
                                onChange={onChange}
                                placeholder="Enter your password"
                                aria-describedby="passwordError"
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={togglePasswordVisibility}
                                style={{ borderRadius: '0 4px 4px 0' }}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {formError.password && <div id="passwordError" className="invalid-feedback">{formError.password}</div>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${formError.confirmPassword && 'is-invalid'}`}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={signupCreds.confirmPassword}
                            onChange={onChange}
                            placeholder="Confirm your password"
                            aria-describedby="confirmPasswordError"
                        />
                        {formError.confirmPassword && <div id="confirmPasswordError" className="invalid-feedback">{formError.confirmPassword}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </button>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </form>
            </div>
        </div>
    );
};
