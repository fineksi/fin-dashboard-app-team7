import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import './App.css';

import Login from "../src/pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<div>
          <img src={reactLogo} alt="React logo" />
          <img src={viteLogo} alt="Vite logo" />
          <h1>Hello, World this is real</h1>
        </div>} />
      </Routes>
    </Router>
  );
};

App.displayName = React.createElement.name;
export default App;
