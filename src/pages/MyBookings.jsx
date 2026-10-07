import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchBookings = async () => {
  if (!phone.trim()) {
    setError("Please enter your phone number.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await axios.get(
      `http://localhost:8080/api/bookings/phone/${phone}`
    );

    setBookings(response.data);

    if (response.data.length === 0) {
      setError("No bookings found for this phone number.");
    }

  } catch (error) {
    console.error("Error fetching bookings:", error);
    setError("Unable to load bookings.");
  } finally {
    setLoading(false);
  }
};
  const handleCancelBooking = async (bookingId) => {

  const confirmed = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await axios.put(
      `http://localhost:8080/api/bookings/${bookingId}/status?status=CANCELLED`
    );

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "CANCELLED" }
          : booking
      )
    );

  } catch (error) {
    console.error("Cancel booking error:", error);
    setError("Unable to cancel booking.");
  }
};

  return (
    <div className="my-bookings-page">

      <div className="bookings-header">
        <p className="section-label">
          SEETHA RESIDENCY
        </p>

        <h1>My Bookings</h1>

        <p>
          View your booking details and stay information.
        </p>
      </div>
      <div className="booking-search">

  <input
    type="tel"
    placeholder="Enter your phone number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />

  <button onClick={searchBookings}>
    Search My Bookings
  </button>

</div>

      <div className="bookings-container">

        {loading && (
          <div className="no-bookings">
            <h2>Loading bookings...</h2>
          </div>
        )}

        {error && (
          <div className="no-bookings">
            <h2>{error}</h2>
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="no-bookings">
            <h2>No bookings found</h2>
            <p>
              You haven't made any bookings yet.
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>

              <div className="booking-card-header">

                <div>
                  <span>Booking ID</span>
                  <h2>#{booking.id}</h2>
                </div>

                <span className="booking-status">
                  {booking.status}
                </span>

              </div>

              <div className="booking-details">

                <div>
                  <span>Guest</span>
                  <strong>{booking.guestName}</strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>{booking.phone}</strong>
                </div>

                <div>
                  <span>Room</span>
                  <strong>
                   {booking.roomNumber} - {booking.roomType}
                  </strong>
                  </div>

                <div>
                  <span>Guests</span>
                  <strong>{booking.guests}</strong>
                </div>

                <div>
                  <span>Price</span>
                  <strong>
                   ₹{Number(booking.price).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <span>Check-in</span>
                  <strong>
                    {new Date(booking.checkIn).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                    })}
                  </strong>
                </div>

                <div>
                  <span>Checkout</span>
                  <strong>
                    {new Date(booking.checkout).toLocaleString("en-IN")}
                  </strong>
                </div>

                            </div>

              {booking.status !== "CANCELLED" && (
                <button
                  className="cancel-booking-btn"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  Cancel Booking
                </button>
              )}

            </div>
          ))}

      </div>

    </div>
  );
}

export default MyBookings;