import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <div className="spinner-border"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
