import React, { useState } from 'react';
import '../styles/Events.css';

function Events() {
  const [eventType, setEventType] = useState('distributions');

  const events = {
    distributions: [
      { date: '2023-12-15', amount: 0.50, type: 'Quarterly Dividend' },
      { date: '2023-09-15', amount: 0.50, type: 'Quarterly Dividend' },
      { date: '2023-06-15', amount: 0.45, type: 'Quarterly Dividend' },
      { date: '2023-03-15', amount: 0.45, type: 'Quarterly Dividend' },
      { date: '2022-12-15', amount: 0.45, type: 'Quarterly Dividend' },
      { date: '2022-09-15', amount: 0.40, type: 'Quarterly Dividend' },
      { date: '2022-06-15', amount: 0.40, type: 'Quarterly Dividend' },
      { date: '2022-03-15', amount: 0.40, type: 'Quarterly Dividend' },
      { date: '2021-12-15', amount: 0.35, type: 'Quarterly Dividend' },
      { date: '2020-12-15', amount: 0.30, type: 'Annual Dividend' },
      { date: '2015-12-15', amount: 0.25, type: 'Annual Dividend' },
      { date: '2010-12-15', amount: 0.20, type: 'Annual Dividend' },
      { date: '2000-12-15', amount: 0.15, type: 'Annual Dividend' },
      { date: '1990-12-15', amount: 0.10, type: 'Annual Dividend' },
      { date: '1980-12-15', amount: 0.05, type: 'Annual Dividend' },
    ],
    transactions: [
      { date: '2023-11-01', type: 'Purchase', shares: 5000, price: 85.50 },
      { date: '2023-10-15', type: 'Sale', shares: 2000, price: 86.25 },
      { date: '2023-09-01', type: 'Purchase', shares: 10000, price: 84.75 },
      { date: '2023-08-15', type: 'Sale', shares: 3000, price: 85.00 },
      { date: '2023-07-01', type: 'Purchase', shares: 7500, price: 83.50 },
      { date: '2023-06-15', type: 'Sale', shares: 1500, price: 84.00 },
      { date: '2022-12-01', type: 'Purchase', shares: 15000, price: 80.00 },
      { date: '2022-06-01', type: 'Sale', shares: 5000, price: 82.50 },
      { date: '2021-12-01', type: 'Purchase', shares: 20000, price: 75.00 },
      { date: '2020-12-01', type: 'Purchase', shares: 25000, price: 70.00 },
      { date: '2015-12-01', type: 'Purchase', shares: 50000, price: 50.00 },
      { date: '2010-12-01', type: 'Purchase', shares: 100000, price: 30.00 },
      { date: '2000-12-01', type: 'Purchase', shares: 200000, price: 15.00 },
      { date: '1990-12-01', type: 'Purchase', shares: 500000, price: 5.00 },
      { date: '1980-12-01', type: 'Purchase', shares: 1000000, price: 1.00 },
    ],
    valuations: [
      { date: '2023-12-31', valuation: 4500000000 },
      { date: '2022-12-31', valuation: 4200000000 },
      { date: '2021-12-31', valuation: 3800000000 },
      { date: '2020-12-31', valuation: 3500000000 },
      { date: '2019-12-31', valuation: 3200000000 },
      { date: '2018-12-31', valuation: 3000000000 },
      { date: '2017-12-31', valuation: 2800000000 },
      { date: '2016-12-31', valuation: 2500000000 },
      { date: '2015-12-31', valuation: 2200000000 },
      { date: '2014-12-31', valuation: 2000000000 },
      { date: '2013-12-31', valuation: 1800000000 },
      { date: '2012-12-31', valuation: 1500000000 },
      { date: '2011-12-31', valuation: 1200000000 },
      { date: '2010-12-31', valuation: 1000000000 },
      { date: '2005-12-31', valuation: 500000000 },
      { date: '2000-12-31', valuation: 250000000 },
      { date: '1995-12-31', valuation: 100000000 },
      { date: '1990-12-31', valuation: 50000000 },
      { date: '1980-12-31', valuation: 10000000 },
      { date: '1970-12-31', valuation: 1000000 },
      { date: '1960-12-31', valuation: 100000 },
      { date: '1950-12-31', valuation: 10000 },
    ]
  };

  return (
    <div className="events">
      <h1>Events</h1>
      <div className="event-filters">
        <button onClick={() => setEventType('distributions')} className={`btn ${eventType === 'distributions' ? 'active' : ''}`}>Distributions</button>
        <button onClick={() => setEventType('transactions')} className={`btn ${eventType === 'transactions' ? 'active' : ''}`}>Transactions</button>
        <button onClick={() => setEventType('valuations')} className={`btn ${eventType === 'valuations' ? 'active' : ''}`}>Valuations</button>
      </div>
      <div className="event-list">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              {eventType === 'distributions' && <th>Type</th>}
              {eventType === 'distributions' && <th>Amount per Share</th>}
              {eventType === 'transactions' && <th>Type</th>}
              {eventType === 'transactions' && <th>Shares</th>}
              {eventType === 'transactions' && <th>Price per Share</th>}
              {eventType === 'valuations' && <th>Valuation</th>}
            </tr>
          </thead>
          <tbody>
            {events[eventType].map((event, index) => (
              <tr key={index}>
                <td>{event.date}</td>
                {eventType === 'distributions' && <td>{event.type}</td>}
                {eventType === 'distributions' && <td>${event.amount.toFixed(2)}</td>}
                {eventType === 'transactions' && <td>{event.type}</td>}
                {eventType === 'transactions' && <td>{event.shares.toLocaleString()}</td>}
                {eventType === 'transactions' && <td>${event.price.toFixed(2)}</td>}
                {eventType === 'valuations' && <td>${event.valuation.toLocaleString()}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Events;