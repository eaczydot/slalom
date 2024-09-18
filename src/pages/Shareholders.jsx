import React, { useState } from 'react';
import '../styles/Shareholders.css';

function Shareholders() {
  const [filter, setFilter] = useState('all');

  const shareholders = [
    { id: 1, name: 'John Doe', shares: 100000, percentage: '10%', class: 'Common' },
    { id: 2, name: 'Jane Smith', shares: 50000, percentage: '5%', class: 'Preferred' },
    { id: 3, name: 'Bob Johnson', shares: 75000, percentage: '7.5%', class: 'Common' },
    { id: 4, name: 'Alice Brown', shares: 25000, percentage: '2.5%', class: 'Preferred' },
  ];

  const filteredShareholders = filter === 'all' 
    ? shareholders 
    : shareholders.filter(s => s.class.toLowerCase() === filter);

  return (
    <div className="shareholders">
      <h1>Shareholders</h1>
      <div className="filter-section">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`filter-btn ${filter === 'common' ? 'active' : ''}`} onClick={() => setFilter('common')}>Common</button>
        <button className={`filter-btn ${filter === 'preferred' ? 'active' : ''}`} onClick={() => setFilter('preferred')}>Preferred</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Shares</th>
              <th>Percentage</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            {filteredShareholders.map(shareholder => (
              <tr key={shareholder.id}>
                <td>{shareholder.name}</td>
                <td>{shareholder.shares.toLocaleString()}</td>
                <td>{shareholder.percentage}</td>
                <td>{shareholder.class}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Shareholders;