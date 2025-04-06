import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OrganizerDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState({});
  const organizerId = localStorage.getItem('userId'); // Ensure this is correctly set

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Log the organizerId to ensure it's correct
        console.log('Organizer ID:', organizerId);

        // Fetch events for this organizer
        const res = await fetch(`http://localhost:5000/api/events/by-organizer/${organizerId}`);
        const data = await res.json();

        // Log the response to verify that data is returned
        console.log('Fetched events:', data);

        // Ensure that the data is an array before setting state
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('Expected an array of events, but got:', data);
          setEvents([]); // Safeguard in case of unexpected data structure
        }

        // Fetch bookings for each event
        const allBookings = {};
        for (const event of data) {
          const ticketRes = await fetch(`http://localhost:5000/api/tickets/by-event/${event._id}`);
          const ticketData = await ticketRes.json();
          allBookings[event._id] = ticketData;
        }

        setBookings(allBookings);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      }
    };

    if (organizerId) {
      fetchEvents();
    }
  }, [organizerId]);

  // Check if events is an array before rendering
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
