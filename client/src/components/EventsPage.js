import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './EventsPage.css';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showBookings, setShowBookings] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

    // Handle booking of event
    const handleBookTicket = async (eventId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/bookings/book-event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ eventId }),
        });
    
        const data = await response.json();
        if (response.ok) {
          alert('Booking successful!');
          navigate('/my-bookings', { state: { bookingSuccess: true } });
        } else {
          alert(data.message || 'Booking failed');
        }
      } catch (err) {
        console.error('Error booking event:', err);
        alert('Error booking event');
      }
    };
    

  const handleViewBookings = async () => {
    try {
      const token = localStorage.getItem('token');  // Ensure token is available in localStorage
      const userId = localStorage.getItem('userId'); // Ensure userId is available in localStorage

      if (!token || !userId) {
        alert('User not logged in.');
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/bookings/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Attach the token in Authorization header
        },
      });

      // Handle the response
      if (response.status === 200) {
        // Update the state to show bookings
        console.log('Bookings:', response.data);
      }
    } catch (error) {
      console.error('Failed to load bookings:', error);
      alert('Failed to load your bookings.');
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Fetching events from the backend...');
        const response = await fetch('http://localhost:5000/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (location.state?.bookingSuccess) {
      alert('Your event has been booked successfully!');
    }
  }, [location]);

  const fetchMyBookings = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Ensure userId is stored
      if (!userId) {
        alert("User not logged in.");
        return;
      }
  
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      // Fetch bookings for the logged-in user
      const response = await fetch(`http://localhost:5000/api/bookings/user/${userId}`, { headers });
      const data = await response.json();
      
      if (response.ok) {
        console.log('Bookings:', data); // Check if you get data here
        setMyBookings(data); // Update the state with the fetched bookings
        setShowBookings(true); // Show the bookings section
      } else {
        alert("Error fetching bookings: " + data.message); // Handle errors
      }
    } catch (err) {
      console.error("Error fetching bookings", err);
      alert("Failed to load your bookings.");
    }
  };
  

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
        <button className="view-bookings-btn" onClick={fetchMyBookings}>
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
