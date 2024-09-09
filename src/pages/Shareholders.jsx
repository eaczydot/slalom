import React, { useState, useMemo } from 'react';
import '../styles/Shareholders.css';

const shareholderData = [
  { name: 'John Doe', type: 'individual', shares: 1000, percentage: 5 },
  { name: 'Jane Smith', type: 'individual', shares: 2000, percentage: 10 },
  { name: 'Acme Corp', type: 'institutional', shares: 5000, percentage: 25 },
  { name: 'Global Investments', type: 'institutional', shares: 8000, percentage: 40 },
  { name: 'Employee Stock Plan', type: 'employee', shares: 4000, percentage: 20 },
];

const Shareholders = () => {
  const [filters, setFilters] = useState({
    individual: true,
    institutional: true,
    employee: true,
  });

  const handleFilterChange = (filter) => {
    setFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const filteredShareholders = useMemo(() => {
    return shareholderData.filter(shareholder => filters[shareholder.type]);
  }, [filters]);

  return (
    <div className="shareholders">
      <h1 className="page-title">Shareholders</h1>
      <div className="filter-section">
        {Object.entries(filters).map(([key, value]) => (
          <button
            key={key}
            className={`filter-btn btn ${value ? 'btn-primary space-gradient' : 'btn-secondary'}`}
            onClick={() => handleFilterChange(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
      <div className="table-container card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Shares</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {filteredShareholders.map((shareholder, index) => (
              <tr key={index}>
                <td>{shareholder.name}</td>
                <td>{shareholder.type}</td>
                <td>{shareholder.shares.toLocaleString()}</td>
                <td>{shareholder.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shareholders;