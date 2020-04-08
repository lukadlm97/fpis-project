import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './navbar/navbar'

function App() {
  return (
   <>
    <Router>
      <NavBar/>
    </Router>
   </>
  );
}

export default App;
