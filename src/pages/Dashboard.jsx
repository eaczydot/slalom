import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createChart, ColorType } from 'lightweight-charts';
import debounce from 'lodash/debounce';
import '../styles/Dashboard.css';

// Updated sample data with summaries and thumbnails
const documentsNeedingSignature = [
  { name: 'Annual Report', date: '2023-04-01', summary: 'Review and sign the company\'s annual financial report.', thumbnail: '📊' },
  { name: 'Board Resolution', date: '2023-03-25', summary: 'Approve the new strategic initiative for expanding into Asian markets.', thumbnail: '🌏' },
];

const recentAnnouncements = [
  { name: 'Q4 Earnings Report', date: '2023-03-15', summary: 'Company exceeded Q4 expectations with a 15% revenue increase.', thumbnail: '📈' },
  { name: 'New Product Launch', date: '2023-02-28', summary: 'Introducing our revolutionary AI-powered analytics tool.', thumbnail: '🚀' },
];

const upcomingEvents = [
  { name: 'Annual Shareholder Meeting', date: '2023-05-10', summary: 'Join us for our annual meeting to discuss company performance and future plans.', thumbnail: '👥' },
  { name: 'Q1 Earnings Call', date: '2023-04-20', summary: 'Quarterly financial results and Q&A with the executive team.', thumbnail: '📞' },
];

const recentEvents = [
  { name: 'Board Meeting', date: '2023-03-01', summary: 'Discussed and approved the new sustainability initiative.', thumbnail: '🌿' },
  { name: 'Investor Conference', date: '2023-02-15', summary: 'Presented our growth strategy at the annual Tech Investors Summit.', thumbnail: '💼' },
];

const Dashboard = React.memo(() => {
  const chartContainerRef = useRef();
  const chartRef = useRef(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 300 });
  const [isChartReady, setIsChartReady] = useState(false);
  const [chartError, setChartError] = useState(null);

  const handleResize = useCallback(
    debounce(() => {
      if (chartContainerRef.current) {
        const { width } = chartContainerRef.current.getBoundingClientRect();
        setChartSize({ width, height: 300 });
      }
    }, 100),
    []
  );

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [handleResize]);

  useEffect(() => {
    if (chartContainerRef.current && chartSize.width > 0 && !chartRef.current) {
      try {
        const chart = createChart(chartContainerRef.current, {
          width: chartSize.width,
          height: 300,
          layout: {
            background: { type: ColorType.Solid, color: '#003A5C' },
            textColor: '#FFFFFF',
          },
          grid: {
            vertLines: { color: '#004B73' },
            horzLines: { color: '#004B73' },
          },
          rightPriceScale: {
            visible: false,
          },
          timeScale: {
            borderColor: '#004B73',
          },
          crosshair: {
            mode: 0, // Disable crosshair
          },
        });

        const lineSeries = chart.addLineSeries({
          color: '#FF5A5F',
          lineWidth: 2,
        });

        lineSeries.setData(companyValuationData.map(item => ({
          time: item.time,
          value: item.value / 1000000000,
        })));

        chart.timeScale().fitContent();
        setIsChartReady(true);
        chartRef.current = chart;
      } catch (error) {
        console.error('Error creating chart:', error);
        setChartError('Unable to load chart. Please try again later.');
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [chartSize.width]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.applyOptions({ width: chartSize.width, height: chartSize.height });
    }
  }, [chartSize]);

  const renderDashboardItem = useCallback((title, value, emoji, trend = null) => (
    <div className="dashboard-item card">
      <div className="dashboard-item-header">
        <span className="dashboard-emoji">{emoji}</span>
        <h2>{title}</h2>
      </div>
      <p className="large-number">{value}</p>
      {trend && (
        <p className={`trend ${trend.direction}`}>
          {trend.direction === 'up' ? '⬆️' : '⬇️'} {trend.value}
        </p>
      )}
    </div>
  ), []);

  const renderListItem = useCallback((item, showButton = false) => (
    <li key={item.name} className="dashboard-list-item">
      <div className="list-item-content">
        <div className="list-item-header">
          <span className="item-thumbnail">{item.thumbnail}</span>
          <strong>{item.name}</strong>
        </div>
        <span className="item-date">{item.date}</span>
        <p className="item-summary">{item.summary}</p>
      </div>
      {showButton && (
        <Link to="/documents" className="btn btn-primary space-gradient">Sign</Link>
      )}
    </li>
  ), []);

  const memoizedDashboardGrid = useMemo(() => (
    <div className="dashboard-grid">
      {renderDashboardItem("Total Shareholders", "1,234", "👥", { direction: 'up', value: '2.5%' })}
      {renderDashboardItem("Total Shares", "10M", "📊", { direction: 'up', value: '1.2%' })}
      {renderDashboardItem("Latest Valuation", "$4.5B", "💰", { direction: 'up', value: '5.7%' })}
    </div>
  ), [renderDashboardItem]);

  const memoizedDocumentsToSign = useMemo(() => (
    <div className="dashboard-item card">
      <h2>📝 Documents Requiring Signature</h2>
      {documentsNeedingSignature.length > 0 ? (
        <ul className="dashboard-list">
          {documentsNeedingSignature.map(doc => renderListItem(doc, true))}
        </ul>
      ) : (
        <p>No documents require signature at this time.</p>
      )}
    </div>
  ), [documentsNeedingSignature, renderListItem]);

  const memoizedDashboardItems = useMemo(() => (
    <div className="dashboard-details">
      {memoizedDocumentsToSign}
      <div className="dashboard-item card">
        <h2>📢 Recent Announcements</h2>
        <ul className="dashboard-list">
          {recentAnnouncements.map(item => renderListItem(item))}
        </ul>
      </div>
      <div className="dashboard-item card">
        <h2>🗓️ Upcoming Events</h2>
        <ul className="dashboard-list">
          {upcomingEvents.map(item => renderListItem(item))}
        </ul>
      </div>
      <div className="dashboard-item card">
        <h2>🎉 Recent Events</h2>
        <ul className="dashboard-list">
          {recentEvents.map(item => renderListItem(item))}
        </ul>
      </div>
    </div>
  ), [memoizedDocumentsToSign, renderListItem]);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      {memoizedDashboardGrid}
      {memoizedDashboardItems}
      <div className="valuation-chart card" ref={chartContainerRef}>
        <h2>📈 Company Valuation Over Time</h2>
        {!isChartReady && !chartError && <div className="chart-placeholder">Loading chart...</div>}
        {chartError && <div className="chart-error">{chartError}</div>}
      </div>
    </div>
  );
});

export default Dashboard;