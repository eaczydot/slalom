import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaFileSignature, FaChartLine, FaUsers, FaMoneyBillWave, FaExchangeAlt, FaRobot, FaPaperPlane } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = {
        totalShareholders: 1234,
        totalShares: '10M',
        latestValuation: '$4.5B',
        sharePrice: '$450',
        activeAuctions: 3,
        documentsToSign: [
          { id: 1, name: 'Annual Report', dueDate: '2024-03-31' },
          { id: 2, name: 'Board Resolution', dueDate: '2024-04-15' },
          { id: 3, name: 'Stock Option Agreement', dueDate: '2024-05-01' },
        ],
        valuationHistory: [
          { year: 2019, value: 3200000000 },
          { year: 2020, value: 3500000000 },
          { year: 2021, value: 3800000000 },
          { year: 2022, value: 4200000000 },
          { year: 2023, value: 4500000000 },
        ],
      };
      setDashboardData(mockData);
      setIsLoading(false);
    }, 1000);

    // Add initial greeting message
    setChatMessages([{ type: 'ai', content: "Hello Evan! How can I assist you with your shareholder information today?" }]);
  }, []);

  const chartData = {
    labels: dashboardData?.valuationHistory.map(item => item.year) || [],
    datasets: [
      {
        label: 'Company Valuation',
        data: dashboardData?.valuationHistory.map(item => item.value) || [],
        borderColor: 'rgb(12, 100, 250)',
        backgroundColor: 'rgba(12, 100, 250, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Company Valuation Over Time',
        font: {
          size: 16,
          weight: 'normal',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + (value / 1e9).toFixed(1) + 'B';
          },
        },
      },
    },
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() !== '') {
      setChatMessages([...chatMessages, { type: 'user', content: currentMessage }]);
      // Simulate AI response (replace with actual AI integration)
      setTimeout(() => {
        setChatMessages(prev => [...prev, { type: 'ai', content: `Here's some information about ${currentMessage}, Evan...` }]);
      }, 1000);
      setCurrentMessage('');
    }
  };

  const handlePresetQuestion = (question) => {
    setChatMessages([...chatMessages, { type: 'user', content: question }]);
    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'ai', content: `Here's the answer to "${question}"...` }]);
    }, 1000);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">Error loading dashboard data: {error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, Evan</h1>
      <div className="dashboard-section chat-interface">
        <div className="chat-container">
          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div key={index} className={`chat-message ${message.type}`}>
                {message.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Ask about your shares, documents, or vesting schedule..."
            />
            <button onClick={handleSendMessage}><FaPaperPlane /></button>
          </div>
        </div>
        <div className="preset-questions">
          <button onClick={() => handlePresetQuestion("What's my current share count?")}>Share Count</button>
          <button onClick={() => handlePresetQuestion("When is my next vesting date?")}>Next Vesting Date</button>
          <button onClick={() => handlePresetQuestion("Do I have any documents to sign?")}>Pending Documents</button>
          <button onClick={() => handlePresetQuestion("What's the company's current valuation?")}>Company Valuation</button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-item">
          <FaUsers className="dashboard-icon" />
          <h2>Total Shareholders</h2>
          <p className="large-number">{dashboardData.totalShareholders.toLocaleString()}</p>
          <p className="trend positive">⬆️ 2.5%</p>
        </div>
        <div className="dashboard-item">
          <FaMoneyBillWave className="dashboard-icon" />
          <h2>Total Shares</h2>
          <p className="large-number">{dashboardData.totalShares}</p>
          <p className="trend positive">⬆️ 1.2%</p>
        </div>
        <div className="dashboard-item">
          <FaChartLine className="dashboard-icon" />
          <h2>Latest Valuation</h2>
          <p className="large-number">{dashboardData.latestValuation}</p>
          <p className="trend positive">⬆️ 5.7%</p>
        </div>
        <div className="dashboard-item">
          <FaMoneyBillWave className="dashboard-icon" />
          <h2>Share Price</h2>
          <p className="large-number">{dashboardData.sharePrice}</p>
          <p className="trend positive">⬆️ 3.2%</p>
        </div>
        <div className="dashboard-item">
          <FaExchangeAlt className="dashboard-icon" />
          <h2>Active Auctions</h2>
          <p className="large-number">{dashboardData.activeAuctions}</p>
          <Link to="/liquidity-portal" className="btn">View Auctions</Link>
        </div>
      </div>

      <div className="dashboard-section documents-to-sign">
        <h2><FaFileSignature /> Documents Requiring Signature</h2>
        <table>
          <thead>
            <tr>
              <th>Document</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.documentsToSign.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.name}</td>
                <td>{doc.dueDate}</td>
                <td>
                  <Link to={`/documents/${doc.id}`} className="btn-sign">Sign Now</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section valuation-chart">
        <h2>Company Valuation</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <Link to="/shareholders" className="btn">View All Shareholders</Link>
        <Link to="/documents" className="btn">Upload New Document</Link>
        <Link to="/liquidity-portal" className="btn">Create Dividend Auction</Link>
      </div>
    </div>
  );
};

export default Dashboard;