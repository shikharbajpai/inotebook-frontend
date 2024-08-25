import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { Navbar } from "./components/layout/Navbar";
import NoteState from "./context/notes/notestate";
import AuthState from "./context/auth/authstate";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import Alert from "./components/common/Alert";
import Footer from './components/layout/Footer';
import './App.css'; // Import CSS file for layout

function App() {
  const [alert, setAlert] = useState(null);

  // Function to clear the alert
  const clearAlert = () => setAlert(null);

  return (
    <div className="app-container">
      <AuthState>
        <NoteState>
          <BrowserRouter>
            <Navbar />
            <div className="main-content">
              <div className="mt-3 mx-3">
                {alert && <Alert type={alert.type} message={alert.message} autoClose={alert?.autoClose} />}
              </div>
              <Routes>
                <Route exact path="/" element={<Home setAlert={setAlert} />} />
                <Route exact path="/about" element={<About clearAlert={clearAlert} />} />
                <Route exact path="/login" element={<Login setAlert={setAlert} clearAlert={clearAlert} />} />
                <Route exact path="/signup" element={<Signup setAlert={setAlert} clearAlert={clearAlert} />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </NoteState>
      </AuthState>
    </div>
  );
}

export default App;
