import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OrganizerDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState({});
  const organizerId = localStorage.getItem('userId'); 
  const token = localStorage.getItem('token'); // ⬅️ Get the JWT token from localStorage

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Organizer ID:', organizerId);

        const res = await fetch(`http://localhost:5000/api/events/by-organizer/${organizerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await res.json();
        console.log('Fetched events:', data);

        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('Expected an array of events, but got:', data);
          setEvents([]);
        }

        const allBookings = {};
        for (const event of data) {
          const ticketRes = await fetch(`http://localhost:5000/api/tickets/by-event/${event._id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          const ticketData = await ticketRes.json();
          allBookings[event._id] = ticketData;
        }

        setBookings(allBookings);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      }
    };

    if (organizerId && token) {
      fetchEvents();
    }
  }, [organizerId, token]);

  if (!Array.isArray(events)) {
    return <p>Loading events...</p>;
  }

  return (
    <div className="organizer-dashboard">
      <h1>Organizer Dashboard</h1>
      <button onClick={() => navigate('/create-event')} className="admin-button primary">
        Create New Event
      </button>

      <div className="dashboard-events">
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <h2>{event.title}</h2>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <h4>Bookings:</h4>
              {bookings[event._id]?.length ? (
                <ul>
                  {bookings[event._id].map((ticket) => (
                    <li key={ticket._id}>
                      {ticket.firstName} {ticket.lastName} - {ticket.email} - {ticket.numberOfTickets} tickets
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No bookings yet.</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OrganizerDashboard;
