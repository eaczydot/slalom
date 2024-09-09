import React, { Suspense, lazy, useState, memo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import './styles/App.css';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Shareholders = lazy(() => import('./pages/Shareholders'));
const Events = lazy(() => import('./pages/Events'));
const Documents = lazy(() => import('./pages/Documents'));

const MemoizedHeader = memo(Header);

function App() {
  const [unsignedDocuments] = useState(2);

  return (
    <Router>
      <div className="App">
        <MemoizedHeader unsignedDocuments={unsignedDocuments} />
        <div className="content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/shareholders" element={<Shareholders />} />
              <Route path="/events" element={<Events />} />
              <Route path="/documents" element={<Documents />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;