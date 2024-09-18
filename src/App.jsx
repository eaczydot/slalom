import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/App.css';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Shareholders = lazy(() => import('./pages/Shareholders'));
const Events = lazy(() => import('./pages/Events'));
const Documents = lazy(() => import('./pages/Documents'));
const Profile = lazy(() => import('./pages/Profile'));
const CashflowManagement = lazy(() => import('./pages/CashflowManagement'));
const DividendAuction = lazy(() => import('./pages/DividendAuction'));
const VestingSchedule = lazy(() => import('./pages/VestingSchedule'));
const LiquidityPortal = lazy(() => import('./pages/LiquidityPortal'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const [unsignedDocuments, setUnsignedDocuments] = useState(2);

  return (
    <Router>
      <ErrorBoundary>
        <div className="App">
          <Header unsignedDocuments={unsignedDocuments} />
          <main className="content">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/shareholders" element={<Shareholders />} />
                <Route path="/events" element={<Events />} />
                <Route path="/documents" element={<Documents setUnsignedDocuments={setUnsignedDocuments} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cashflow" element={<CashflowManagement />} />
                <Route path="/dividend-auction" element={<DividendAuction />} />
                <Route path="/vesting-schedule" element={<VestingSchedule />} />
                <Route path="/liquidity-portal" element={<LiquidityPortal />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          {/* Footer component removed */}
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;