import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="dashboard-item">
          <h2>Total Shareholders</h2>
          <p className="large-number">1,234</p>
          <p className="trend positive">⬆️ 2.5%</p>
        </div>
        <div className="dashboard-item">
          <h2>Total Shares</h2>
          <p className="large-number">10M</p>
          <p className="trend positive">⬆️ 1.2%</p>
        </div>
        <div className="dashboard-item">
          <h2>Latest Valuation</h2>
          <p className="large-number">$4.5B</p>
          <p className="trend positive">⬆️ 5.7%</p>
        </div>
        <div className="dashboard-item">
          <h2>Share Price</h2>
          <p className="large-number">$450</p>
          <p className="trend positive">⬆️ 3.2%</p>
        </div>
      </div>
      
      <div className="documents-to-sign">
        <h2>Documents Requiring Signature</h2>
        <ul>
          <li>
            <span>Annual Report</span>
            <Link to="/documents" className="btn-sign">Sign</Link>
          </li>
          <li>
            <span>Board Resolution</span>
            <Link to="/documents" className="btn-sign">Sign</Link>
          </li>
        </ul>
      </div>
      
      <div className="valuation-chart">
        <h2>Company Valuation</h2>
        {/* Add chart component here */}
      </div>
    </div>
  );
};

export default Dashboard;