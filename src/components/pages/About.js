import React, { useEffect } from 'react';
import './About.css'; // Create a corresponding CSS file for styles

export const About = ({ clearAlert }) => {
    useEffect(() => {
        clearAlert();
    }, [clearAlert]);
  return (
    <div className="about-container">
      <h1>About iNotebook</h1>
      <p>
        iNotebook is a powerful note-taking application designed to help you keep track of your ideas and tasks. 
        With features such as adding, editing, and deleting notes, it's easy to stay organized and focused.
      </p>
      <p>
        Developed with React on the frontend and Node.js on the backend, iNotebook offers a seamless user experience 
        and reliable performance.
      </p>
      <h2>Features:</h2>
      <ul>
        <li>Easy note creation and management</li>
        <li>Organize notes with tags</li>
        <li>Responsive design for all devices</li>
      </ul>
      <p>
        For more information, contact us at <a href="mailto:support@inotebook.com">support@inotebook.com</a>.
      </p>
    </div>
  );
};
