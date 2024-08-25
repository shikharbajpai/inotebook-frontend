import React from 'react'

const InstructionPanel = () => {
    return (
        <>
            {/* Instructions Panel */}
            <div className="alert alert-info" role="alert">
                <h5 className="alert-heading">Instructions</h5>
                <ul>
                    <li><strong>Name:</strong> Must contain only letters and spaces. Minimum 3 characters.</li>
                    <li><strong>Email:</strong> Enter a valid email address (e.g., user@example.com).</li>
                    <li>
                        <strong>Password:</strong>
                        <ul>
                            <li>At least 6 characters long</li>
                            <li>Contains at least one uppercase letter</li>
                            <li>Contains at least one lowercase letter</li>
                            <li>Contains at least one digit</li>
                            <li>Contains at least one special character (!@#$%^&*(),.?":{ }|&lt;&gt;)</li>
                            <li>No spaces allowed</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default InstructionPanel