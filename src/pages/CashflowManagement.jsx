import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/CashflowManagement.css';

const CashflowManagement = () => {
  const [cashflowData, setCashflowData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      const mockData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Income',
            data: [1000000, 1200000, 980000, 1100000, 1300000, 1150000],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'Expenses',
            data: [800000, 950000, 1020000, 880000, 1000000, 930000],
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          }
        ]
      };
      setCashflowData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cashflow-management">
      <h1>Cashflow Management</h1>
      <div className="cashflow-chart">
        <Line data={cashflowData} />
      </div>
      <div className="financial-actions">
        <button className="btn">Generate Financial Report</button>
        <button className="btn">Forecast Cash Flow</button>
        <button className="btn">Manage Expenses</button>
      </div>
    </div>
  );
};

export default CashflowManagement;