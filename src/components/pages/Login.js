import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const Login = (props) => {
    const { setAlert, clearAlert } = props;
    const authContext = useContext(AuthContext);
    const { login, error, setError, token, setToken } = authContext;

    const navigate = useNavigate();

    const initialState = {
        email: "",
        password: ""
    };

    const [loginCreds, setLoginCreds] = useState(initialState);
    const [formError, setFormError] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        clearAlert();
        if (token) {
            setToken('');
            localStorage.removeItem('token');
        }
    }, [clearAlert, setError, token, setToken]);

    const onChange = (e) => {
        setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        setFormError({});
        const newErrors = {};
        const { email, password } = loginCreds;

        // Trim the email to remove leading and trailing spaces
        const trimmedEmail = email.trim();
        loginCreds.email = trimmedEmail;

        // Email validation
        if (!trimmedEmail) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        } else if (/\.\w{2,4}\.\w{2,4}$/.test(email)) { // Checks for ".com.con" etc.
            newErrors.email = 'Please check your email domain';
        }

        // Password validation
        if (!password.trim()) {
            newErrors.password = 'Password is required';
        }

        setFormError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormError({});

        if (validateForm()) {
            const success = await login(loginCreds.email, loginCreds.password);
            if (success) {
                setAlert({ type: 'success', message: 'Logged in successfully.' });
                setLoginCreds(initialState);
                navigate('/');
            } else {
                setAlert({ type: 'danger', message: error || 'Login failed. Please try again.' });
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className={`form-control ${formError.email && 'is-invalid'}`}
                            id="email"
                            name="email"
                            value={loginCreds.email}
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
                                value={loginCreds.password}
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
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </form>
            </div>
        </div>
    );
};
