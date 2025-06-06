import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventsPage.css';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [myBookings, setMyBookings] = useState([]);

  const navigate = useNavigate();
console.log(showBookings)
console.log(setMyBookings)
  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="events-page">
      <header className="header">
        <h1>WE'VE JUST GOT THING</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search Event" />
          <button>WatchGo</button>
        </div>
        <button
          className="view-bookings-btn"
          onClick={() => navigate('/my-bookings')}
        >
          View My Bookings
        </button>
      </header>

      {showBookings && (
        <section className="my-bookings">
          <h2>My Bookings</h2>
          {myBookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <ul>
              {myBookings.map((booking) => (
                <li key={booking._id}>
                  <strong>{booking.eventTitle}</strong> on {new Date(booking.eventDate).toLocaleDateString()} at {booking.venue}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section className="explore-categories">
        <h2>Explore Categories</h2>
        <div className="categories">
          {['All', 'Music', 'Sports', 'Conference', 'Workshop', 'Festival', 'Art', 'Other'].map(category => (
            <span
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="all-events">
        <h2>All Events</h2>
        <div className="events-list">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <div key={index} className="event-card">
                <div className="event-month">{new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                  <p>{event.description}</p>
                  <p className="distance">{event.venue}</p>
                  <button onClick={() => navigate(`/book-ticket/${event._id}`)}>Book Ticket</button>
                </div>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
        <button className="see-more">See More</button>
      </section>
    </div>
  );
}

export default EventsPage;
