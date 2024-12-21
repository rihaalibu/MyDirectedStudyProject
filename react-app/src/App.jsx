import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';
import {useState} from  'react';


function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
   <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        {console.log(isAuthenticated) }
        <Route 
          path="/*" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />
        {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
        <Route path="/dashboard/*" element= {<Dashboard />} />
      </Routes>
      </div>
  );
}

export default App;
