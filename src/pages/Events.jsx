import React, { useState, useEffect } from 'react';
import { FaCalendar, FaUsers, FaFileAlt } from 'react-icons/fa';
import '../styles/Events.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setEvents([
        { id: 1, title: 'Annual Shareholder Meeting', date: '2024-05-15', type: 'meeting' },
        { id: 2, title: 'Q2 Earnings Report', date: '2024-07-30', type: 'report' },
        { id: 3, title: 'Board of Directors Election', date: '2024-09-01', type: 'election' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getEventIcon = (type) => {
    switch (type) {
      case 'meeting':
        return <FaUsers />;
      case 'report':
        return <FaFileAlt />;
      case 'election':
        return <FaCalendar />;
      default:
        return <FaCalendar />;
    }
  };

  if (isLoading) {
    return <div className="loading">Loading events...</div>;
  }

  return (
    <div className="events">
      <h1>Upcoming Events</h1>
      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className="event-item">
            <div className="event-icon">{getEventIcon(event.type)}</div>
            <div className="event-details">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;