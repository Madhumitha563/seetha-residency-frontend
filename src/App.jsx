import Customers from "./pages/Customers";
import AdminLogin from "./pages/AdminLogin";
import AdminRooms from "./pages/AdminRooms";
import AdminDashboard from "./pages/AdminDashboard";
import MyBookings from "./pages/MyBookings";
import Booking from "./pages/Booking";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Rooms from "./pages/Rooms";
import "./index.css";


function Home() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">

        <div className="logo">
          SEETHA <span>RESIDENCY</span>
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#about">About</a>
          <Link to="/rooms">Rooms</Link>
          <Link to="/my-bookings">My Bookings</Link>
          <a href="#facilities">Facilities</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>

        <Link to="/rooms" className="book-btn">
          Book Now
        </Link>

      </header>


      {/* HERO */}
      <section className="hero" id="home">

        <div className="hero-overlay">

          <div className="hero-content">

            <p className="hero-label">
              WELCOME TO SEETHA RESIDENCY
            </p>

            <h1>
              A Comfortable Stay
              <br />
              in Tiruvannamalai
            </h1>

            <p className="hero-description">
              Experience a comfortable and peaceful stay
              with modern facilities and warm hospitality.
            </p>

            <Link to="/rooms" className="hero-btn">
              Book Your Stay
            </Link>

          </div>

        </div>

      </section>


      {/* ABOUT */}
      <section className="about" id="about">

        <div className="about-image">

          <img
            src="/hotel-about.jpg"
            alt="Seetha Residency"
          />

        </div>


        <div className="about-content">

          <p className="section-label">
            ABOUT SEETHA RESIDENCY
          </p>

          <h2>
            Comfort & Convenience
            <br />
            for Every Guest
          </h2>

          <p>
            Seetha Residency is located on the
            Vellore–Tiruvannamalai National Highway,
            Inam Kariyandal, Tiruvannamalai.
          </p>

          <p>
            Our hotel provides comfortable accommodation
            with modern facilities for guests visiting
            Tiruvannamalai.
          </p>


          <div className="about-info">

            <div>
              <strong>25</strong>
              <span>Rooms</span>
            </div>

            <div>
              <strong>12</strong>
              <span>Hour Stay</span>
            </div>

          </div>

        </div>

      </section>


      {/* ROOMS PREVIEW */}
      <section className="rooms" id="rooms">

        <div className="section-heading">

          <p className="section-label">
            OUR ACCOMMODATION
          </p>

          <h2>
            Choose Your Room
          </h2>

          <p>
            Comfortable rooms designed for a relaxing stay.
          </p>

        </div>


        <div className="room-grid">

          {/* STANDARD */}
          <div className="room-card">

            <img
              src="/room-standard.jpg"
              alt="Standard Room"
            />

            <div className="room-content">

              <h3>Standard Room</h3>

              <p>
                Comfortable accommodation for up to
                2 guests.
              </p>

              <div className="room-details">
                <span>👤 2 Guests</span>
                <span>⏱ 12 Hours</span>
              </div>

              <div className="room-price">
                <span>From</span>
                <strong>₹1,500</strong>
              </div>

            </div>

          </div>


          {/* DELUXE */}
          <div className="room-card">

            <img
              src="/room-deluxe.jpg"
              alt="Deluxe Room"
            />

            <div className="room-content">

              <h3>Deluxe Room</h3>

              <p>
                Spacious accommodation for up to
                3 guests.
              </p>

              <div className="room-details">
                <span>👤 3 Guests</span>
                <span>⏱ 12 Hours</span>
              </div>

              <div className="room-price">
                <span>From</span>
                <strong>₹2,000</strong>
              </div>

            </div>

          </div>


          {/* SUITE */}
          <div className="room-card">

            <img
              src="/room-suite.jpg"
              alt="Suite Room"
            />

            <div className="room-content">

              <h3>Suite Room</h3>

              <p>
                Premium accommodation for up to
                5 guests.
              </p>

              <div className="room-details">
                <span>👤 5 Guests</span>
                <span>⏱ 12 Hours</span>
              </div>

              <div className="room-price">
                <span>From</span>
                <strong>₹2,500</strong>
              </div>

            </div>

          </div>

        </div>


        <div style={{ textAlign: "center", marginTop: "40px" }}>

          <Link to="/rooms" className="hero-btn">
            View All Rooms
          </Link>

        </div>

      </section>


      {/* FACILITIES */}
      <section className="facilities" id="facilities">

        <div className="section-heading">

          <p className="section-label">
            HOTEL FACILITIES
          </p>

          <h2>
            Everything You Need
          </h2>

        </div>


        <div className="facility-grid">

          <div className="facility">
            <div className="facility-icon">❄️</div>
            <h3>Air Conditioning</h3>
            <p>Comfortable rooms with AC.</p>
          </div>

          <div className="facility">
            <div className="facility-icon">📶</div>
            <h3>High-Speed Wi-Fi</h3>
            <p>Stay connected during your visit.</p>
          </div>

          <div className="facility">
            <div className="facility-icon">📺</div>
            <h3>LG Flat-Screen TV</h3>
            <p>Entertainment in your room.</p>
          </div>

          <div className="facility">
            <div className="facility-icon">🚗</div>
            <h3>Car Parking</h3>
            <p>Convenient parking for guests.</p>
          </div>

          <div className="facility">
            <div className="facility-icon">🚿</div>
            <h3>24-Hour Hot Water</h3>
            <p>Hot water available throughout the day.</p>
          </div>

          <div className="facility">
            <div className="facility-icon">⚡</div>
            <h3>Power Backup</h3>
            <p>Reliable power backup facility.</p>
          </div>

          <div className="facility">
            <div className="facility-icon">🛏️</div>
            <h3>Premium Bedding</h3>
            <p>Comfortable bedding for a relaxing stay.</p>
          </div>

          <div className="facility">
            <div className="facility-icon">🛕</div>
            <h3>Temple Transport</h3>
            <p>Transport facility for temple visits.</p>
          </div>

        </div>

      </section>


      {/* CONTACT */}
      <section className="contact" id="contact">

        <div className="contact-content">

          <p className="section-label">
            CONTACT US
          </p>

          <h2>
            Plan Your Stay With Us
          </h2>

          <p>
            Vellore–Tiruvannamalai National Highway,
            Inam Kariyandal, Tiruvannamalai,
            Tamil Nadu 606604, India
          </p>

          <div className="contact-details">

            <a href="tel:+919043272305">
              📞 +91 90432 72305
            </a>

            <a href="mailto:seetharesidency03@gmail.com">
              ✉️ seetharesidency03@gmail.com
            </a>

          </div>

          <Link to="/rooms" className="hero-btn">
            Book Your Stay
          </Link>

        </div>

      </section>


      {/* FOOTER */}
      <footer>

        <div className="footer-logo">
          SEETHA <span>RESIDENCY</span>
        </div>

        <p>
          © 2026 Seetha Residency. All rights reserved.
        </p>

        <p>
          Tiruvannamalai, Tamil Nadu
        </p>

      </footer>

    </div>
  );
}


function App() {

  return (
    <BrowserRouter>

      <Routes>
         

        <Route path="/" element={<Home />} />

        <Route path="/rooms" element={<Rooms />} />

        <Route path="/booking" element={<Booking />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/admin"element={<AdminDashboard />} />

        <Route path="/admin/rooms" element={<AdminRooms />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        
        <Route path="/admin/customers" element={<Customers />} />

      </Routes>

    </BrowserRouter>
  );
}


export default App;