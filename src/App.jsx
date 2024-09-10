import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Documents from './pages/Documents';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/documents" element={<Documents />} />
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;