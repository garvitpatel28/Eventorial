import React from 'react';
import './EventsPage.css';

function EventsPage() {
  const popularEvents = [
    {
      month: 'NOV',
      title: 'Lakeable Camping at Tavana',
      date: '25 - 26',
      description: 'Adventure class, Explore the Geosphere, July 2018',
      distance: '+5 kilometres',
    },
    {
      month: 'DEC',
      title: 'Sound Of Christmas 2025',
      date: '02',
      description: '30 Greenberry Gardeners, February 2023',
      distance: '+5 kilometres',
    },
    {
      month: 'DEC',
      title: 'Royal College of Art to Design',
      date: '02',
      description: '2006, RFC Caterology, 10/06 17th',
      distance: '4 sec',
    },
    {
      month: 'DEC',
      title: 'Global Engineering Education',
      date: '05',
      description: 'Engle 2022, The Right Sampson, June 2019',
      distance: '+5 kilometres',
    },
    {
      month: 'DEC',
      title: 'Cricket Business Meetup',
      date: '06',
      description: 'Forty Park Loft Lake, Mumbai, February 2023',
      distance: '+5 kilometres',
    },
  ];

  const trendingEvents = [
    {
      month: 'NOV',
      title: 'Town Lock - Aditya Gadhu’s in',
      date: '25',
      description: 'Trending, The Nr. Haja, Toronto, June 10, 2021',
      distance: '50% + 25 kilometres',
    },
    {
      month: 'DEC',
      title: 'Camp United Nations for Girls',
      date: '02',
      description: 'Los Angeles 2023, Residence Los Angeles Airport Hotel, April 17th',
      distance: '50%',
    },
    {
      month: 'DEC',
      title: 'Bullywood Zoo 2 Party',
      date: '01 - 02',
      description: 'Thursday, Melbourne, 12:00 PM - 20:00',
      distance: '40% + 137 kilometres',
    },
    {
      month: 'NOV',
      title: 'Chaperoners Nov 28 Business',
      date: '28',
      description: 'Networking Event for Food Bus, Los Angeles University Centre, Toronto, May 21st',
      distance: '+5 kilometres',
    },
    {
      month: 'NOV',
      title: 'A Day of well-being and creativity',
      date: '25',
      description: 'Alittle Cornworks for Kids, Seattle, 10/06 18th',
      distance: '50%',
    },
  ];

  return (
    <div className="events-page">
      <header className="header">
        <h1>WE'VE JUST GOT THING</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search Event" />
          <button>WatchGo</button>
        </div>
      </header>

      <section className="explore-categories">
        <h2>Explore Categories</h2>
        <div className="categories">
          <span>Entertainment</span>
          <span>Educational & Business</span>
          <span>Cultural & Arts</span>
          <span>Sports & Fitness</span>
          <span>Technology & Innovation</span>
          <span>Travel & Adventure</span>
        </div>
      </section>

      <section className="popular-events">
        <h2>Popular Events in Kitchener</h2>
        <div className="events-list">
          {popularEvents.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-month">{event.month}</div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.description}</p>
                <p className="distance">{event.distance}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="see-more">See More</button>
      </section>

      <section className="trending-events">
        <h2>Trending Events around the World</h2>
        <div className="events-list">
          {trendingEvents.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-month">{event.month}</div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.description}</p>
                <p className="distance">{event.distance}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="see-more">See More</button>
      </section>

      <section className="create-event">
        <h2>Create an event with Eventorial</h2>
        <p>Got a show, event, activity or a great experience? Partner with us & get listed on Eventify</p>
      </section>

      <footer className="footer">
        <div className="footer-section">
          <h3>Company Info</h3>
          <p>Garvit P.</p>
          <p>Namrata P.</p>
          <p>Abrar A.</p>
        </div>
        <div className="footer-section">
          <h3>Help</h3>
          <p>Accent Report</p>
          <p>Long-Term</p>
          <p>Team Training</p>
          <p>Total Purchase Terms & Conditions</p>
        </div>
        <div className="footer-section">
          <h3>Categories</h3>
          <p>Comma Logo</p>
          <p>Famous Customer</p>
          <p>Business Advocacy</p>
          <p>Book Design</p>
          <p>Shareholders</p>
          <p>Sponsor</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
          <p>YouTube</p>
        </div>
        <div className="footer-section">
          <h3>Download The App</h3>
          <p>Google Play</p>
          <p>Download the App Store</p>
        </div>
      </footer>
    </div>
  );
}

export default EventsPage;