import React, { useEffect, useState } from 'react';

const Alert = ({ type, message, autoClose = true, autoCloseDuration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true); // Reset visibility whenever the message or type changes
  }, [message, type]);

  useEffect(() => {
    if (autoClose && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDuration, visible]);

  if (!visible) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      {!autoClose && (
        <button type="button" className="btn-close" aria-label="Close" onClick={() => setVisible(false)}></button>
      )}
    </div>
  );
};

export default Alert;
