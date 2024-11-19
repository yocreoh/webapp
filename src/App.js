import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import CardList from './components/CardList';
import CardDetails from './components/CardDetails';
import data from './data.json';

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div className="bg-white min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<CardList data={data} />} />
          <Route 
            path="/estampita/:id" 
            element={<CardDetails data={data} />} 
            errorElement={<div>Route Error</div>}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
