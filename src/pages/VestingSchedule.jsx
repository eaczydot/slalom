import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/VestingSchedule.css';

const VestingSchedule = () => {
  const [vestingData, setVestingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      const mockData = {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4'],
        datasets: [
          {
            label: 'Vested Shares',
            data: [250, 500, 750, 1000],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };
      setVestingData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <div className="loading">Loading vesting schedule...</div>;
  }

  return (
    <div className="vesting-schedule">
      <h1>Vesting Schedule</h1>
      <div className="vesting-chart">
        <Line data={vestingData} />
      </div>
      <div className="vesting-details">
        <h2>Your Vesting Details</h2>
        <p>Total Shares Granted: 1000</p>
        <p>Vesting Period: 4 years</p>
        <p>Vesting Frequency: Quarterly</p>
        <p>Cliff Period: 1 year</p>
        <p>Vested Shares: 500</p>
        <p>Unvested Shares: 500</p>
        <p>Next Vesting Date: July 1, 2023</p>
        <p>Shares Vesting on Next Date: 62.5</p>
      </div>
    </div>
  );
};

export default VestingSchedule;