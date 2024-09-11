import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Documents from './pages/Documents';
import Dashboard from './pages/Dashboard';
import Shareholders from './pages/Shareholders';
import Events from './pages/Events';
import Profile from './pages/Profile';
import Header from './components/Header';
import './styles/App.css';

function App() {
  const [unsignedDocuments, setUnsignedDocuments] = React.useState(2); // Example value

  return (
    <Router>
      <div className="App">
        <Header unsignedDocuments={unsignedDocuments} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/shareholders" element={<Shareholders />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;